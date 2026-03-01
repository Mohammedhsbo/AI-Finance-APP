import { PrismaClient } from "./generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const db =
  globalThis.prisma ||
  new PrismaClient({
    adapter,
    log: [],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
