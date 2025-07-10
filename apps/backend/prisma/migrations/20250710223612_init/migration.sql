-- CreateTable
CREATE TABLE "keyboards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "brand" TEXT NOT NULL,
    "layout" TEXT NOT NULL,
    "switches" TEXT,
    "keycaps" TEXT,
    "wireless" BOOLEAN NOT NULL DEFAULT false,
    "rgb" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "stockCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keyboards_pkey" PRIMARY KEY ("id")
);
