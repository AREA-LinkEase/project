import { API_LINK } from "./config";

export async function sendRequest(url, opts) {
    const result = await fetch(API_LINK + url, opts)
    let content = await result.json()

    return {
        content: content,
        status: result.status
    };
}