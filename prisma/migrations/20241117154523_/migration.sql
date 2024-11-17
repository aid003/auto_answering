/*
  Warnings:

  - A unique constraint covering the columns `[typeAdvertizing]` on the table `Messages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Messages_typeAdvertizing_key" ON "Messages"("typeAdvertizing");
