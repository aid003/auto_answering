import { getToken } from "./getToken.js";
import dotenv from "dotenv";
import { getUnreadsChats } from "./getUnreadsChats.js";
import { PrismaClient } from "@prisma/client";
import { sendMessage } from "./sendMessage.js";
import { bot_tg } from "../index.js";
import { getAllChats } from "./parserAllChats.js";
import { chekIdAdvForAnswer } from "./checkAdvForAnswer.js";

dotenv.config();
const prisma = new PrismaClient();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function botAvito() {
  let unreadChats = [];

  const currentToken = await getToken();

  const chats = await getUnreadsChats(currentToken, process.env.USER_ID).then(
    (data) => data.chats
  );

  if (chats.length >= 1) {
    chats.forEach((el) => {
      unreadChats.push(el);
    });
  }

  // console.log(chats[0].users[1].public_user_profile.item_id)

  for (let chat of unreadChats) {
    const isAdded = await prisma.clients.findUnique({
      where: { idAv: String(chat.users[0].id) },
    });

    // console.log(chat)

    if (isAdded === null) {
      try {
        await prisma.clients.create({
          data: {
            idAv: String(chat.users[0].id),
          },
        });
      } catch (error) {
        console.log("Ошибка записи в idAv");
      }

      await sendMessage(
        process.env.USER_ID,
        chat.id,
        currentToken,
        "Здравствуйте"
      );
      await sleep(20000);

      const message = await chekIdAdvForAnswer(chat.context.value.id);

      await sendMessage(process.env.USER_ID, chat.id, currentToken, message);

      let messageStr = "🟢 Новый клиент";
      messageStr += `\n\nОбъявление: ${chat.context.value.title}`;
      messageStr += `\nКлиент: ${chat.users[0].name}`;
      messageStr += `\n\nСообщение:\n${chat.last_message.content.text}`;
      try {
        await prisma.blackListMessages.create({
          data: {
            avId: chat.last_message.id,
          },
        });
      } catch (error) {
        console.log("Ошибка в blcl");
      }

      const users = await prisma.users.findMany();
      users.forEach(async (user) => {
        await bot_tg.sendMessage(user.idTg, messageStr);
      });
    } else {
      const blackList = await prisma.blackListMessages.findFirst({
        where: {
          avId: chat.last_message.id,
        },
      });

      if (blackList === null) {
        let messageStr = "🟠 Текущий клиент";
        messageStr += `\n\nОбъявление: ${chat.context.value.title}`;
        messageStr += `\nКлиент: ${chat.users[0].name}`;
        messageStr += `\n\nСообщение:\n${chat.last_message.content.text}`;
        try {
          await prisma.blackListMessages.create({
            data: {
              avId: chat.last_message.id,
            },
          });
        } catch (error) {
          console.log("Ошибка в blcl");
        }

        const users = await prisma.users.findMany();
        users.forEach(async (user) => {
          await bot_tg.sendMessage(user.idTg, messageStr);
        });
      }
    }
  }
}
