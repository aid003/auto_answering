import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function chekIdAdvForAnswer(idAdv) {
  let message = "";
  const currentIdAdv = [
    { id: 4453393817, type: "analit" },
    { id: 4453481688, type: "analit" },
    { id: 4421164714, type: "telegram" },
    { id: 4420950534, type: "telegram" },
    { id: 4420607921, type: "telegram" },
    { id: 4421031769, type: "telegram" },
    { id: 4420576567, type: "telegram" },
  ];

  //   { id: 1, typeAdvertizing: 'all', text: 'внешка' },
  //   { id: 2, typeAdvertizing: 'avitolog', text: 'Авитолог' },
  //   { id: 3, typeAdvertizing: 'telegram', text: 'телега' },
  //   { id: 4, typeAdvertizing: 'analit', text: 'аналитика' }

  for (let adv of currentIdAdv) {
    if (adv.id === idAdv) {
      message = await prisma.messages.findUnique({
        where: {
          typeAdvertizing: adv.type,
        },
        select: {
          text: true,
        },
      });
    } else {
      message = await prisma.messages.findUnique({
        where: {
          typeAdvertizing: "all",
        },
        select: {
          text: true,
        },
      });
    }
  }

  return message.text;
}
