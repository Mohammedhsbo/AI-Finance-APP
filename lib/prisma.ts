import { PrismaClient } from "./generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

const missingDatabaseUrlError = () =>
  new Error("DATABASE_URL environment variable is not set");

const createMissingDbProxy = () =>
  new Proxy(
    {},
    {
      get() {
        throw missingDatabaseUrlError();
      },
    }
  ) as PrismaClient;

const dbClient = connectionString
  ? new PrismaClient({
      adapter: new PrismaPg(new Pool({ connectionString })),
      log: [],
    })
  : createMissingDbProxy();

export const db = globalThis.prisma || dbClient;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
