import dotenv from "dotenv";
import { prisma } from "../index.js";
import { getToken } from "./getToken.js";

dotenv.config();

export async function getAllChats(current_token, user_id) {
  const request = await fetch(
    `https://api.avito.ru/messenger/v2/accounts/${user_id}/chats?unread_only=false`,
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

export async function updateMesseges() {
  const currentToken = await getToken();
  const allChats = await getAllChats(currentToken, process.env.USER_ID);

  let counter = 0;
  for (let chat of allChats.chats) {
    try {
      await prisma.clients.create({
        data: {
          idAv: String(chat.users[0].id),
        },
      });
    } catch (error) {
      counter += 1;
    }
  }
  return allChats.chats.length - counter;
}
