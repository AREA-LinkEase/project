/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param item
 * @param activeItem
 */
export const handleURLQueries = (router, path) => {
  if (Object.keys(router.query).length && path) {
    const arr = Object.keys(router.query)

    return router.asPath.includes(path) && router.asPath.includes(router.query[arr[0]]) && path !== '/'
  }

  return false
}

/**
 * Check if the given item has the given url
 * in one of its children
 *
 * @param item
 * @param currentURL
 */
export const hasActiveChild = (item, currentURL) => {
  const { children } = item
  if (!children) {
    return false
  }
  for (const child of children) {
    if (child.children) {
      if (hasActiveChild(child, currentURL)) {
        return true
      }
    }
    const childPath = child.path

    // Check if the child has a link and is active
    if (
      child &&
      childPath &&
      currentURL &&
      (childPath === currentURL || (currentURL.includes(childPath) && childPath !== '/'))
    ) {
      return true
    }
  }

  return false
}


/**
 * Get connected nodes for a given node ID
 *
 * @param nodeId - ID of the node
 * @param nodes - Array of nodes
 * @param edges - Array of edges
 * @returns {Array} - Array of connected nodes
 */
export const getConnectedNodes = (nodeId, nodes, edges) => {
  const connectedNodeIds = edges
    .filter(edge => edge.source === nodeId || edge.target === nodeId)
    .map(edge => (edge.source === nodeId ? edge.target : edge.source));

  const connectedNodes = nodes.filter(node => connectedNodeIds.includes(node.id));

  return connectedNodes;
};

/**
 * Convert values based on their type.
 *
 * @param {any} value - Value to convert.
 * @param {string} valueType - Type of the value (e.g., 'number', 'bool', etc.).
 * @returns {any} - Converted value.
 */
const convertValue = (value, valueType) => {
  switch (valueType) {
    case 'number':
      return parseFloat(value);

    // case 'bool':
    //     const stringValue = String(value);
    //     return /^(true|false)$/i.test(stringValue) ? stringValue.toLowerCase() === 'true' : stringValue;
      

    default:
      return value;
  }
};

/**
 * Compare values based on the specified type of comparison block.
 *
 * @param {string} type - Type of the comparison block (e.g., 'equalBlock', 'superiorBlock', etc.).
 * @param {string} valueType - Type of the values being compared (e.g., 'number', 'bool', etc.).
 * @param {any} value1 - First value to compare.
 * @param {any} value2 - Second value to compare.
 * @returns {boolean} - Result of the comparison.
 */
export const compareValues = (type, valueType, value1, value2) => {
  const convertedValue1 = convertValue(value1, valueType);
  const convertedValue2 = convertValue(value2, valueType);

  switch (type) {
    case 'equalBlock':
      return convertedValue1 === convertedValue2;

    case 'notEqualBlock':
      return convertedValue1 !== convertedValue2;

    case 'superiorBlock':
      return convertedValue1 > convertedValue2;

    case 'inferiorBlock':
      return convertedValue1 < convertedValue2;

    case 'superiorOrEqualBlock':
      return convertedValue1 >= convertedValue2;

    case 'inferiorOrEqualBlock':
      return convertedValue1 <= convertedValue2;

    default:
      console.error('Type de bloc de comparaison non pris en charge :', type);
      return false;
  }
};

/**
 * Check if the given node type is a comparison block type.
 *
 * @param {string} type - Type of the node.
 * @returns {boolean} - True if the node type is a comparison block type, otherwise false.
 */
export const isComparaisonNode = (type) => (
  type === '==' ||
  type === '!=' ||
  type === '>' ||
  type === '<' ||
  type === '>=' ||
  type === '<='
);

/**
 * Check if the given node type is a conversion block type.
 *
 * @param {string} type - Type of the node.
 * @returns {boolean} - True if the node type is a conversion block type, otherwise false.
 */
export const isConversionNode = (type) => (
  type === 'NumberToBool'
);

/**
 * Convert the given value based on the specified block type.
 *
 * @param {string} type - Type of the block (e.g., 'numberToBoolBlock', 'otherType', etc.).
 * @param {any} value - Value to be converted.
 * @returns {any} - Converted value.
 */
export const convertType = (type, value) => {
  switch (type) {
    case 'NumberToBool':
      // Convert number to boolean (example implementation)
      return value !== 0;

    // Ajoutez d'autres cas de conversion au besoin

    default:
      // Retourne la valeur inchangée si le type de bloc n'est pas reconnu
      return value;
  }
};