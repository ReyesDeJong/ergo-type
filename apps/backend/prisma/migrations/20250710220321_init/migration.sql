-- CreateTable
CREATE TABLE "keyboards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "brand" TEXT NOT NULL,
    "layout" TEXT NOT NULL,
    "switches" TEXT,
    "keycaps" TEXT,
    "wireless" BOOLEAN NOT NULL DEFAULT false,
    "rgb" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "stockCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
