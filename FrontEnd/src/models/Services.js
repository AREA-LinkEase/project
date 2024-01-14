import networkConfig from "../configs/networkConfig";

/**
 * Represents a Service class for handling service-related operations.
 */
export class Service {
  /**
   * Search for services based on input.
   *
   * @param {string} jwt - The Bearer token for authentication.
   * @param {string} input - The search input.
   * @returns {Promise<object[]|number>} - Returns a list of services matching the search or a status code if unsuccessful.
   */
  static async search(jwt, input) {
    let response = await fetch(networkConfig.url + "/services/search/" + input, {
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
   * Get public services.
   *
   * @param {string} jwt - The Bearer token for authentication.
   * @returns {Promise<object[]|number>} - Returns a list of public services for the user or a status code if unsuccessful.
   */
  static async getAll(jwt) {
    let response = await fetch(networkConfig.url + "/services/@all", {
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
   * Get public services for the authenticated user.
   *
   * @param {string} jwt - The Bearer token for authentication.
   * @returns {Promise<object[]|number>} - Returns a list of public services for the user or a status code if unsuccessful.
   */
  static async getPublicServices(jwt) {
    let response = await fetch(networkConfig.url + "/services/@me/public", {
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
   * Get private services for the authenticated user.
   *
   * @param {string} jwt - The Bearer token for authentication.
   * @returns {Promise<object[]|number>} - Returns a list of private services for the user or a status code if unsuccessful.
   */
  static async getPrivateServices(jwt) {
    let response = await fetch(networkConfig.url + "/services/@me/private", {
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
   * Get all services for the authenticated user.
   *
   * @param {string} jwt - The Bearer token for authentication.
   * @returns {Promise<object[]|number>} - Returns a list of all services for the user or a status code if unsuccessful.
   */
  static async getServices(jwt) {
    let response = await fetch(networkConfig.url + "/services/@me", {
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
   * Create a new service for the authenticated user.
   *
   * @param {string} jwt - The Bearer token for authentication.
   * @param {object} body - The service details.
   * @returns {Promise<boolean|number>} - Returns true if the service has been created successfully or a status code if unsuccessful.
   */
  static async createService(jwt, body) {
    let response = await fetch(networkConfig.url + "/services/@me", {
      headers: {
        "Authorization": jwt
      },
      method: "POST",
      body: body
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Search for events based on input.
   *
   * @param {string} jwt - The Bearer token for authentication.
   * @param {string} input - The search input.
   * @returns {Promise<object[]|number>} - Returns a list of events matching the search or a status code if unsuccessful.
   */
  static async searchEvents(jwt, input) {
    let response = await fetch(networkConfig.url + "/services/events/search/" + input, {
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
   * Get all events for the authenticated user.
   *
   * @param {string} jwt - The Bearer token for authentication.
   * @returns {Promise<object[]|number>} - Returns a list of all events for the user or a status code if unsuccessful.
   */
  static async getAllEvents(jwt) {
    let response = await fetch(networkConfig.url + "/services/events/@all", {
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
   * Constructor for the Service class.
   *
   * @param {string} jwt - The Bearer token for authentication.
   * @param {number} id - The ID of the service.
   */
  constructor(jwt, id) {
    this.token = jwt;
    this.id = id;
  }

  /**
   * Remove a user from a service.
   *
   * @param {number} userId - The ID of the user to be removed.
   * @returns {Promise<boolean|number>} - Returns true if the user has been removed successfully or a status code if unsuccessful.
   */
  async removeUser(userId) {
    let response = await fetch(networkConfig.url + "/services/" + this.id + "/users/" + userId, {
      headers: {
        "Authorization": this.token
      },
      method: "DELETE"
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Get users associated with a service.
   *
   * @returns {Promise<object[]|number>} - Returns a list of user IDs associated with the service or a status code if unsuccessful.
   */
  async getUsers() {
    let response = await fetch(networkConfig.url + "/services/" + this.id + "/users", {
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
   * Add a user to a service.
   *
   * @param {number} userId - The ID of the user to be added.
   * @returns {Promise<boolean|number>} - Returns true if the user has been added successfully or a status code if unsuccessful.
   */
  async addUser(userId) {
    let response = await fetch(networkConfig.url + "/services/" + this.id + "/users", {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id: userId
      })
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Get triggers associated with a service.
   *
   * @returns {Promise<object[]|number>} - Returns a list of triggers associated with the service or a status code if unsuccessful.
   */
  async getTriggers() {
    let response = await fetch(networkConfig.url + "/services/" + this.id + "/triggers", {
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
   * Get actions associated with a service.
   *
   * @returns {Promise<object[]|number>} - Returns a list of actions associated with the service or a status code if unsuccessful.
   */
  async getActions() {
    let response = await fetch(networkConfig.url + "/services/" + this.id + "/actions", {
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
   * Create a new event for a service.
   *
   * @param {object} body - The event details.
   * @returns {Promise<boolean|number>} - Returns true if the event has been created successfully or a status code if unsuccessful.
   */
  async createEvent(body) {
    let response = await fetch(networkConfig.url + "/services/" + this.id + "/events", {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(body)
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Update an existing event for a service.
   *
   * @param {number} id - The ID of the service.
   * @param {object} body - The updated event details.
   * @returns {Promise<boolean|number>} - Returns true if the event has been updated successfully or a status code if unsuccessful.
   */
  async editEvent(id, body) {
    let response = await fetch(networkConfig.url + "/services/" + this.id + "/events/" + id, {
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
   * Delete an existing event for a service.
   *
   * @param {number} id - The ID of the service.
   * @returns {Promise<boolean|number>} - Returns true if the event has been deleted successfully or a status code if unsuccessful.
   */
  async deleteEvent(id) {
    let response = await fetch(networkConfig.url + "/services/" + this.id + "/events/" + id, {
      headers: {
        "Authorization": this.token
      },
      method: "DELETE"
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Get details of an event.
   *
   * @returns {Promise<object|number>} - Returns details of the event or a status code if unsuccessful.
   */
  async getEvent(id) {
    let response = await fetch(networkConfig.url + "/services/" + this.id + "/events/" + id, {
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
   * Get details of a service.
   *
   * @returns {Promise<object|number>} - Returns details of the service or a status code if unsuccessful.
   */
  async get() {
    let response = await fetch(networkConfig.url + "/services/" + this.id, {
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
   * Update details of a service.
   *
   * @param {object} body - The updated service details.
   * @returns {Promise<boolean|number>} - Returns true if the service has been updated successfully or a status code if unsuccessful.
   */
  async edit(body) {
    let response = await fetch(networkConfig.url + "/services/" + this.id, {
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
   * Delete a service.
   *
   * @returns {Promise<boolean|number>} - Returns true if the service has been deleted successfully or a status code if unsuccessful.
   */
  async destroy() {
    let response = await fetch(networkConfig.url + "/services/" + this.id, {
      headers: {
        "Authorization": this.token
      },
      method: "DELETE"
    })
    return (response.ok) ? true : response.status;
  }
}
