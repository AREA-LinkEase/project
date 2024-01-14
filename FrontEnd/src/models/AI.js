import networkConfig from "../configs/networkConfig";

export class ChatAI {
  constructor() {
    this.messages = [];
  }

  async sendMessage(message) {
    this.messages.push({"role": "user", "content": message})
    let response = await fetch(networkConfig.url + "/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: this.messages
      })
    })
    if (response.ok) {
      let result = await response.json()
      this.messages = result.messages;
      return this.messages
    } else
      return response.status
  }
}

export async function promptWorkflowAI(prompt, nodes, workflow) {
  let response = await fetch(networkConfig.url + "/ai/workflow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: prompt,
      nodes: nodes,
      workflow: workflow
    })
  })
  if (response.ok)
    return await response.json()
  else
    return response.status
}
