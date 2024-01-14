import networkConfig from "../configs/networkConfig";

/**
 * Represents an Automate class for performing operations related to automates.
 */
export class Automate {
  /**
   * Search automates by input.
   * @param {string} jwt - The JSON Web Token for authorization.
   * @param {string} input - The search input.
   * @returns {Promise<Array|number>} - A promise that resolves to an array of automates or returns a status code on failure.
   */
  static async search(jwt, input) {
    let response = await fetch(networkConfig.url + "/automates/search/" + input, {
      headers: {
        "Authorization": jwt
      }
    })
    if (response.ok)
      return response.json()
    else
      return response.status
  }

  /**
   * get All public automates.
   * @param {string} jwt - The JSON Web Token for authorization.
   * @returns {Promise<Array|number>} - A promise that resolves to an array of automates or returns a status code on failure.
   */
  static async getAll(jwt) {
    let response = await fetch(networkConfig.url + "/automates/@all", {
      headers: {
        "Authorization": jwt
      }
    })
    if (response.ok)
      return response.json()
    else
      return response.status
  }

  /**
   * Create an instance of Automate.
   * @param {string} jwt - The JSON Web Token for authorization.
   * @param {number} id - The ID of the automate.
   */
  constructor(jwt, id) {
    this.id = id;
    this.token = jwt;
  }

  /**
   * Get details of a specific automate.
   * @returns {Promise<Object|number>} - A promise that resolves to automate details or returns a status code on failure.
   */
  async get() {
    let response = await fetch(networkConfig.url + "/automates/" + this.id, {
      headers: {
        "Authorization": this.token
      }
    })
    if (response.ok)
      return response.json()
    else
      return response.status
  }

  /**
   * Get logs for a specific automate.
   * @returns {Promise<Array|number>} - A promise that resolves to an array of logs or returns a status code on failure.
   */
  async getLogs() {
    let response = await fetch(networkConfig.url + "/automates/" + this.id + "/logs", {
      headers: {
        "Authorization": this.token
      }
    })
    if (response.ok)
      return response.json()
    else
      return response.status
  }

  /**
   * Delete logs for a specific automate.
   * @returns {Promise<boolean|number>} - A promise that resolves to true if logs are deleted successfully or returns a status code on failure.
   */
  async clearLogs() {
    let response = await fetch(networkConfig.url + "/automates/" + this.id + "/logs", {
      headers: {
        "Authorization": this.token
      },
      method: "DELETE"
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Update details of a specific automate.
   * @param {Object} body - The updated automate details.
   * @returns {Promise<boolean|number>} - A promise that resolves to true if automate details are updated successfully or returns a status code on failure.
   */
  async edit(body) {
    let response = await fetch(networkConfig.url + "/automates/" + this.id, {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(body)
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Update workflow for a specific automate.
   * @param {Object} workflow - The updated workflow data.
   * @returns {Promise<boolean|number>} - A promise that resolves to true if the workflow is updated successfully or returns a status code on failure.
   */
  async editWorkflow(workflow) {
    let response = await fetch(networkConfig.url + "/automates/" + this.id + "/workflow", {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({
        workflow
      })
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Add variable for a specific automate.
   * @param {String} name - The name of the variable.
   * @param {String} content - The content of the variable.
   * @returns {Promise<boolean|number>} - A promise that resolves to true if the variable is added successfully or returns a status code on failure.
   */
  async addVariable(name, content) {
    let response = await fetch(networkConfig.url + "/automates/" + this.id + "/variables/" + name, {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        content
      })
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Remove variable for a specific automate.
   * @param {String} name - The name of the variable
   * @returns {Promise<boolean|number>} - A promise that resolves to true if the variable is removed successfully or returns a status code on failure.
   */
  async removeVariable(name) {
    let response = await fetch(networkConfig.url + "/automates/" + this.id + "/variables/"+ name, {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Delete a specific automate.
   * @returns {Promise<boolean|number>} - A promise that resolves to true if the automate is deleted successfully or returns a status code on failure.
   */
  async destroy() {
    let response = await fetch(networkConfig.url + "/automates/" + this.id, {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    return (response.ok) ? true : response.status;
  }
}
