import { getHeader } from "./authUtils";
import { sendRequest } from "./sendRequest";

export async function postWorkspace(title, description, is_private) {
    const opts = {
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify({
            title: title,
            description: description,
            is_private: is_private
        })
    };
    return sendRequest(`/workspaces`, opts);
}

export async function getWorkspaces() {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/workspaces`, opts);
}

export async function getWorkspaceView() {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/workspaces/viewWorkspaces`, opts);
}

export async function getWorkspaceById(workspace_id) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/workspaces/${workspace_id}`, opts);
}

export async function deleteWorkspace(workspace_id) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/workspaces/${workspace_id}`, opts);
}

export async function getWorkspaceByPrivate(workspace_id) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/workspaces/private`, opts);
}

export async function getWorkspaceByPublic(workspace_id) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/workspaces/public`, opts);
}

export async function updateEnableWorkspace(workspace_id, enabled) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/workspaces/${workspace_id}/enable/${enabled}`, opts);
}

export async function getWorkspaceVariables(workspace_id) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/workspaces/${workspace_id}/variables`, opts);
}

export async function postWorkspaceVariable(workspace_id, variable) {
    const opts = {
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify(variable)
    };
    return sendRequest(`/workspaces/${workspace_id}/variables`, opts);
}

export async function changeWorkspaceName(workspace_id, title) {
    const opts = {
        method: "PUT",
        headers: getHeader(),
        body: JSON.stringify({
            title: title
        })
    };
    return sendRequest(`/workspaces/${workspace_id}`, opts);
}

export async function deleteWorkspaceVariable(workspace_id, variable) {
    const opts = {
        method: "DELETE",
        headers: getHeader()
    };
    return sendRequest(`/workspaces/${workspace_id}/variables/${variable}`, opts);
}

export async function addUserInWorkspace(workspace_id, user_id) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/workspaces/${workspace_id}/users/${user_id}`, opts);
}

export async function deleteUserInWorkspace(workspace_id, user_id) {
    const opts = {
        method: "DELETE",
        headers: getHeader()
    };
    return sendRequest(`/workspaces/${workspace_id}/users/${user_id}`, opts);
}
