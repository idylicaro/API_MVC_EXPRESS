-- CreateTable
CREATE TABLE "produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "venda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    FOREIGN KEY ("id_produto") REFERENCES "produto" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
