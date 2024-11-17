-- CreateTable
CREATE TABLE "Messages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeAdvertizing" TEXT NOT NULL,
    "text" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "idTg" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idAv" TEXT NOT NULL
);
