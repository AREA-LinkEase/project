import networkConfig from "../configs/networkConfig";

/**
 * Class representing a Workspace.
 */
export class Workspace {
  /**
   * Retrieves private workspaces for the authenticated user.
   * @param {string} jwt - The JWT token for authentication.
   * @returns {Promise<array|number>} - An array of private workspaces or a status code if the request fails.
   */
  static async getPrivateWorkspaces(jwt) {
    let response = await fetch(networkConfig.url + "/workspaces/@me/private", {
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
   * Retrieves public workspaces.
   * @param {string} jwt - The JWT token for authentication.
   * @returns {Promise<array|number>} - An array of public workspaces or a status code if the request fails.
   */
  static async getAll(jwt) {
    let response = await fetch(networkConfig.url + "/workspaces/@all", {
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
   * Retrieves public workspaces for the authenticated user.
   * @param {string} jwt - The JWT token for authentication.
   * @returns {Promise<array|number>} - An array of public workspaces or a status code if the request fails.
   */
  static async getPublicWorkspaces(jwt) {
    let response = await fetch(networkConfig.url + "/workspaces/@me/public", {
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
   * Retrieves all workspaces for the authenticated user.
   * @param {string} jwt - The JWT token for authentication.
   * @returns {Promise<array|number>} - An array of all workspaces or a status code if the request fails.
   */
  static async getAllWorkspaces(jwt) {
    let response = await fetch(networkConfig.url + "/workspaces/@me", {
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
   * Creates a new workspace.
   * @param {string} jwt - The JWT token for authentication.
   * @param {object} body - Workspace details.
   * @returns {Promise<boolean|number>} - True if successful or a status code if the request fails.
   */
  static async createNewWorkspace(jwt, body) {
    let response = await fetch(networkConfig.url + "/workspaces/@me", {
      headers: {
        "Authorization": jwt,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(body)
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Searches for workspaces based on input.
   * @param {string} jwt - The JWT token for authentication.
   * @param {string} input - Search input.
   * @returns {Promise<array|number>} - An array of workspace search results or a status code if the request fails.
   */
  static async search(jwt, input) {
    let response = await fetch(networkConfig.url + "/workspaces/search/" + input, {
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
   * Constructs a new Workspace instance.
   * @param {string} jwt - The JWT token for authentication.
   * @param {integer} id - The ID of the workspace.
   */
  constructor(jwt, id) {
    this.token = jwt;
    this.id = id;
  }

  /**
   * Retrieves details of a workspace with automates.
   * @returns {Promise<object|number>} - Workspace details with automates or a status code if the request fails.
   */
  async get() {
    let response = await fetch(networkConfig.url + "/workspaces/" + this.id, {
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
   * Edits a workspace.
   * @param {object} body - Workspace details to be updated.
   * @returns {Promise<boolean|number>} - True if successful or a status code if the request fails.
   */
  async edit(body) {
    let response = await fetch(networkConfig.url + "/workspaces/" + this.id, {
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
   * Deletes a user from a workspace.
   * @param {integer} userId - User ID to be removed.
   * @returns {Promise<boolean|number>} - True if successful or a status code if the request fails.
   */
  async deleteUser(userId) {
    let response = await fetch(networkConfig.url + "/workspaces/" + this.id + "/users/" + userId, {
      headers: {
        "Authorization": this.token
      },
      method: "DELETE"
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Add a variable from a workspace.
   * @param {String} name - Name of the variable.
   * @param {String} value - Value of the variable.
   * @returns {Promise<boolean|number>} - True if successful or a status code if the request fails.
   */
  async addVariable(name, value) {
    let response = await fetch(networkConfig.url + "/workspaces/" + this.id + "/variables/" + name, {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        content: value
      })
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Remove a variable from a workspace.
   * @param {String} name - Name of the variable.
   * @returns {Promise<boolean|number>} - True if successful or a status code if the request fails.
   */
  async removeVariable(name) {
    let response = await fetch(networkConfig.url + "/workspaces/" + this.id + "/variables/" + name, {
      headers: {
        "Authorization": this.token
      },
      method: "DELETE"
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Adds a user to a workspace.
   * @param {integer} userId - User ID to be added.
   * @param {integer} permission - Permission level for the user.
   * @returns {Promise<boolean|number>} - True if successful or a status code if the request fails.
   */
  async addUser(userId, permission) {
    let response = await fetch(networkConfig.url + "/workspaces/" + this.id + "/users", {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: userId,
        permission
      })
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Creates a new automate in a workspace.
   * @param {object} body - Automate details.
   * @returns {Promise<boolean|number>} - True if successful or a status code if the request fails.
   */
  async createAutomate(body) {
    let response = await fetch(networkConfig.url + "/workspaces/" + this.id + "/automate", {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(body)
    })
    return (response.ok) ? true : response.status;
  }
}
