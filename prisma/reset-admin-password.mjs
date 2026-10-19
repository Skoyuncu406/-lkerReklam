import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const connectionString = process.env.DIRECT_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL bulunamadı.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const rl = createInterface({
  input: stdin,
  output: stdout,
});

async function main() {
  console.log("\nADMIN ŞİFRE YENİLEME\n");

  const email = (await rl.question("Admin e-posta: ")).trim().toLowerCase();

  const admin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!admin) {
    throw new Error("Admin hesabı bulunamadı.");
  }

  const password = await rl.question("Yeni şifre: ");

  if (password.length < 12) {
    throw new Error("Şifre en az 12 karakter olmalıdır.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash },
  });

  console.log("\nAdmin şifresi başarıyla güncellendi.");
}

try {
  await main();
} catch (error) {
  console.error("\nHata:", error.message);
  process.exitCode = 1;
} finally {
  rl.close();
  await prisma.$disconnect();
}
