export async function sendMessage(user_id, chat_id, current_token, message) {
  const messageSh = {
    message: {
      text: message,
    },
    type: "text",
  };
  const request = await fetch(
    `https://api.avito.ru/messenger/v1/accounts/${user_id}/chats/${chat_id}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + current_token,
      },
      body: JSON.stringify(messageSh),
    }
  ).then((data) => data.json());

  return request;
}
