export async function getUnreadsChats(current_token, user_id) {
  const request = await fetch(
    `https://api.avito.ru/messenger/v2/accounts/${user_id}/chats?unread_only=true`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + current_token,
      },
    }
  ).then((data) => data.json());

  try {
    if (request.error.message === "permission denied") {
      console.log("permission denied");
    }
  } catch (error) {}

  return request;
}
