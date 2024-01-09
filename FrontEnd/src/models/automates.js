import { getHeader } from "./authUtils";
import { sendRequest } from "./sendRequest";

export async function getAutomates() {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/automates`, opts);
}

export async function getAutomatesByWorkspace(workspace_id) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/automates/${workspace_id}`, opts);
}

export async function getAutomateById(workspace_id, automate_id) {
    const opts = {
        headers: getHeader()
    };
    return sendRequest(`/automates/${workspace_id}/${automate_id}`, opts);
}

export async function postAutomate(title, workspace_id) {
    const opts = {
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify({
            title: title,
            workspace_id: workspace_id,
            workflow: null,
            variables: null,
            secrets: null
        })
    };
    return sendRequest(`/automates/${workspace_id}`, opts);
}

export async function putAutomate(workspace_id, action_option, action, trigger, trigger_option) {
    const opts = {
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify({
            workspace_id: workspace_id,
            action_option,
            action: action,
            trigger: trigger,
            trigger_option: trigger_option,
        })
    };
    return sendRequest(`/automates/${workspace_id}`, opts);
}

export async function deleteAutomate(workspace_id, automate_id) {
    const opts = {
        method: "DELETE",
        headers: getHeader()
    };
    return sendRequest(`/automates/${workspace_id}/${automate_id}`, opts);
}
