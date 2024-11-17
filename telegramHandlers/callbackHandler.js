import { bot_tg, prisma } from "../index.js";

// async function chekAndUpdateMessageFromKeyboard(typeAdvertizing, newMessage) {
//   console.log(typeAdvertizing, newMessage);
//   try {
//     const message = await prisma.messages.findUnique({
//       where: {
//         typeAdvertizing: typeAdvertizing,
//       },
//     });

//     if (message === null) {
//       try {
//         await prisma.messages.create({
//           data: {
//             typeAdvertizing: typeAdvertizing,
//             text: newMessage,
//           },
//         });

//         return 1;
//       } catch (error) {
//         return -1;
//       }
//     } else {
//       try {
//         await prisma.messages.update({
//           where: {
//             typeAdvertizing: typeAdvertizing,
//           },
//           data: {
//             text: newMessage,
//           },
//         });
//         return 2;
//       } catch (error) {
//         return -2;
//       }
//     }
//   } catch (error) {
//     console.log("Общая ошибка загрузки текста для объявления");
//   }
// }

// export async function callbackHandler() {
//   let typeAdvertizing = "";
//   let messageId = "";
//   let text = "";

//   await bot_tg.on("callback_query", async function (msg) {
//     switch (msg.data) {
//       case "public_adv":
//         typeAdvertizing = msg.data;
//         try {
//           await bot_tg
//             .sendMessage(msg.from.id, "Введите текст сообщения", {
//               reply_markup: {
//                 inline_keyboard: [
//                   [{ text: "Отмена", callback_data: "cancel" }],
//                 ],
//               },
//             })
//             .then((answ) => (messageId = answ.message_id));
//           await bot_tg
//             .on("text", (ms) => {
//               text = ms.text;
//             })
//             .then(() => {
//               const result = chekAndUpdateMessageFromKeyboard(
//                 typeAdvertizing,
//                 text
//               );
//               console.log(result);
//             });

//           break;
//         } catch (error) {}

//       case "telegram":
//       case "avitolog":
//       case "analitics_for_avito":
//       case "all":
//       case "cancel":
//         bot_tg.deleteMessage(msg.from.id, messageId);
//         break;
//     }

//     bot_tg.answerCallbackQuery(msg.id, []);
//   });
// }
