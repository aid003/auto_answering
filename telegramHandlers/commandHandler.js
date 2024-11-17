import { botAvito } from "../avitoHandlers/bot.js";
import { interval } from "../handlers.js";
import dotenv from "dotenv";
import { bot_tg, prisma } from "../index.js";
import {
  getAllChats,
  updateMesseges,
} from "../avitoHandlers/parserAllChats.js";

dotenv.config();

export async function commandHandler() {
  let isWorking = false;

  bot_tg.on("text", async (msg) => {
    if (msg.text === "/start") {
      await bot_tg.sendMessage(
        msg.chat.id,
        "Авито Автоответы v2.0.0\n\nТех.поддержка: @GMTUSDT"
      );
    }
    if (msg.text === "/add") {
      try {
        isWorking = true;
        interval.make(botAvito, process.env.INTERVAL);
        await bot_tg.sendMessage(msg.chat.id, "🟢");
      } catch (error) {
        await bot_tg.sendMessage(msg.chat.id, "Ошибка статуса");
      }
    }
    if (msg.text === "/stop") {
      try {
        isWorking = false;
        interval.clearAll();
        await bot_tg.sendMessage(msg.chat.id, "🔴");
      } catch (error) {
        await bot_tg.sendMessage(msg.chat.id, "Ошибка статуса");
      }
    }
    if (msg.text === "/status") {
      let messageString = "Cтатус автоответчика: ";
      messageString += isWorking ? "🟢" : "🔴";
      await bot_tg.sendMessage(msg.chat.id, messageString);
    }
    if (msg.text === "/update_clients") {
      try {
        const updatedCount = await updateMesseges();
        await bot_tg.sendMessage(msg.chat.id, `Добавлено ${updatedCount}`);
      } catch (error) {
        await bot_tg.sendMessage(msg.chat.id, "Ошибка обновления данных");
      }
    }
    if (msg.text === "/add_user") {
      try {
        await prisma.users.create({
          data: {
            idTg: msg.from.id,
          },
        });
        await bot_tg.sendMessage(msg.chat.id, "Вы добавлены в рассылку.");
      } catch (error) {
        await bot_tg.sendMessage(msg.chat.id, "Вы уже в рассылке.");
      }
    }
    if (msg.text === "/add_message") {
      try {
        await bot_tg.sendMessage(msg.chat.id, "Выберите группу объявлений", {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Внешняя реклама", callback_data: "public_adv" }],
              [{ text: "Телеграмм", callback_data: "telegram" }],
              [{ text: "Авитолог", callback_data: "avitolog" }],
              [
                {
                  text: "Аналитика для Авито",
                  callback_data: "analitics_for_avito",
                },
              ],
              [{ text: "Общий ответ", callback_data: "all" }],
              [{ text: "Отмена", callback_data: "cancel" }],
            ],
          },
        });
      } catch (error) {
        await bot_tg.sendMessage(msg.chat.id, "Ошибка добавления текстов");
      }
    }
  });
}
