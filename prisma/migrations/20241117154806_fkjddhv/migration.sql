/*
  Warnings:

  - A unique constraint covering the columns `[idAv]` on the table `Clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Clients_idAv_key" ON "Clients"("idAv");
