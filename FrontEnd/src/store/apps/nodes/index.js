export const setReduxNodes = (nodes) => ({
    type: 'SET_NODES',
    payload: nodes,
  });
  
  // nodesReducer.js
  const initialState = {
    nodes: [],
  };
  
  const nodesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NODES':
        return { ...state, nodes: action.payload };
      default:
        return state;
    }
  };
  
  export default nodesReducer;