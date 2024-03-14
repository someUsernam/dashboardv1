"use server";

import { db } from "../db";

export async function getUserByEmail(email: string) {
	return await db.user.findUnique({
		where: {
			email: email,
		},
	});
}
