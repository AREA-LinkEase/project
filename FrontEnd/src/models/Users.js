import networkConfig from "../configs/networkConfig";

/**
 * Class representing user management.
 */
export class Users {
  /**
   * Search for a user by input.
   * @param {string} jwt - The JWT token for authorization.
   * @param {string} input - The input to search for a user (email or username).
   * @returns {Promise<Object|number>} - A promise that resolves to the user data if successful, or the HTTP status code on failure.
   */
  static async searchUser(jwt, input) {
    let response = await fetch(networkConfig.url + "/users/search/" + input, {
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
   * Get a user by their ID.
   * @param {string} jwt - The JWT token for authorization.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<Object|number>} - A promise that resolves to the user data if successful, or the HTTP status code on failure.
   */
  static async getUserById(jwt, id) {
    let response = await fetch(networkConfig.url + "/users/" + id, {
      headers: {
        "Authorization": jwt
      }
    })
    if (response.ok)
      return response.json()
    else
      return response.status
  }
}

/**
 * Class representing a user.
 */
export class User {
  /**
   * Create a new User instance.
   * @param {string} token - The JWT token associated with the user.
   */
  constructor(token) {
    this.token = token
  }

  /**
   * Get the authenticated user's data.
   * @returns {Promise<Object|number>} - A promise that resolves to the user data if successful, or the HTTP status code on failure.
   */
  async get() {
    let response = await fetch(networkConfig.url + "/users/@me", {
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
   * Update the authenticated user's data.
   * @param {Object} body - The user data to be updated.
   * @returns {Promise<boolean|number>} - A promise that resolves to `true` if successful, or the HTTP status code on failure.
   */
  async update(body) {
    let response = await fetch(networkConfig.url + "/users/@me", {
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
   * Update the user's avatar.
   * @param {Object} image - The new avatar image.
   * @returns {Promise<boolean|number>} - A promise that resolves to `true` if successful, or the HTTP status code on failure.
   */
  async updateAvatar(image) {
    let response = await fetch(networkConfig.url + "/users/@me/avatar", {
      headers: {
        "Authorization": this.token,
      },
      method: "PUT",
      body: image
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Get the authenticated user's friends.
   * @returns {Promise<Array<Object>|number>} - A promise that resolves to an array of user objects if successful, or the HTTP status code on failure.
   */
  async getFriends() {
    let response = await fetch(networkConfig.url + "/users/@me/friends", {
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
   * Add friends to the authenticated user.
   * @param {number[]} friendsArray - An array of user IDs to add as friends.
   * @returns {Promise<boolean|number>} - A promise that resolves to `true` if successful, or the HTTP status code on failure.
   */
  async addFriends(friendsArray) {
    let response = await fetch(networkConfig.url + "/users/@me/friends", {
      headers: {
        "Authorization": this.token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        "friends": friendsArray
      })
    })
    return (response.ok) ? true : response.status;
  }

  /**
   * Delete a friend from the authenticated user's list.
   * @param {number} userId - The ID of the friend to be removed.
   * @returns {Promise<boolean|number>} - A promise that resolves to `true` if successful, or the HTTP status code on failure.
   */
  async deleteFriend(userId) {
    let response = await fetch(networkConfig.url + "/users/@me/friends/" + userId, {
      headers: {
        "Authorization": this.token
      },
      method: "DELETE"
    })
    return (response.ok) ? true : response.status;
  }
}
