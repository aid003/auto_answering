/*
  Warnings:

  - A unique constraint covering the columns `[idTg]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_idTg_key" ON "Users"("idTg");
