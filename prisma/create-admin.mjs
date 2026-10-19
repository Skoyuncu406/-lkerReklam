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
  console.log("\nÜLKER TABELA — ADMIN HESABI\n");

  const email = (await rl.question("Admin e-posta: ")).trim().toLowerCase();

  const password = await rl.question("Admin şifresi: ");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Geçerli bir e-posta adresi gir.");
  }

  if (password.length < 12) {
    throw new Error("Şifre en az 12 karakter olmalıdır.");
  }

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    throw new Error("Bu e-posta adresiyle admin hesabı zaten mevcut.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      name: "Yönetici",
      active: true,
    },
  });

  console.log("\nAdmin hesabı başarıyla oluşturuldu.");
  console.log("E-posta:", email);
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
