"use server";

import { db } from "../db";

export async function getUserById(id: string) {
	return await db.user.findUnique({ where: { id } });
}
