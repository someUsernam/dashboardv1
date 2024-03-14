import { PrismaClient } from "@prisma/client";

declare global {
	// biome-ignore lint/style/noVar: <explanation>
	var prisma: PrismaClient;
}
const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = db;

export { db };
