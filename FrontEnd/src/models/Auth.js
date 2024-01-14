import networkConfig from "../configs/networkConfig";

/**
 * Class representing user authentication and registration.
 */
export class Auth {
  /**
   * Logs in a user and receives a JWT token.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<object|number>} A Promise that resolves to an object with a JWT token on successful login
   *   or returns an HTTP status code (400, 401, 404, or 500) on failure.
   */
  static async login(username, password) {
    let response = await fetch(networkConfig.url + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    if (response.ok)
      return response.json()
    else
      return response.status
  }
  /**
   * Registers a new user.
   *
   * @param {string} username - The username of the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<boolean|number>} A Promise that resolves to `true` on successful registration or
   *   returns HTTP status code on failure (400, 409, or 500).
   */
  static async register(username, email, password) {
    let response = await fetch(networkConfig.url + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        username,
        password
      })
    })
    return (response.ok) ? true : response.status;
  }
}
