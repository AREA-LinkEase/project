import { getHeader, getUserId } from "./authUtils";
import { sendRequest } from "./sendRequest";

export async function login(username, password) {
    const opts = {
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify({
            username: username,
            password: password
        })
    };
    return sendRequest('/login', opts);
}

export async function register(username, email, password) {
    const opts = {
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    };
    return sendRequest('/register', opts);
}

export async function getAllUsers() {
    const opts = {
        headers: getHeader()
    };
    return sendRequest('/users', opts);
}

export async function getUserById(user_id) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest('/users/' + user_id, opts);
}

export async function getUser() {
    const opts = {
        headers: getHeader()
    };
    return sendRequest('/users/self', opts);
}

export async function getIdByUsername(username) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest('/users/username/' + username, opts);
}

export async function deleteUser(user_id) {
    const opts = {
        method: "DELETE",
        headers: getHeader()
    };
    return sendRequest('/users/' + user_id, opts);
}

export async function editUser(username, email, password, user_id) {
    const opts = {
        method: "PUT",
        headers: getHeader(),
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    };
    return sendRequest('/users' + user_id, opts);
}

// ajouter getUser