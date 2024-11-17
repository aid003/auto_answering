import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { commandHandler } from "./telegramHandlers/commandHandler.js";
import { PrismaClient } from "@prisma/client";
// import { callbackHandler } from "./telegramHandlers/callbackHandler.js";

dotenv.config();
export const bot_tg = new TelegramBot(process.env.API_KEY_BOT, {
  polling: {
    interval: 200,
    autoStart: true,
  },
});
export const prisma = new PrismaClient();

async function main() {
  bot_tg.on("polling_error", (err) => console.log(err.data.error.message));
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode`);

  await commandHandler();
  // await callbackHandler();
}

await main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
