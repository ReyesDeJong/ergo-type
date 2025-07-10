import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Clean up database before tests
  await prisma.keyboard.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
