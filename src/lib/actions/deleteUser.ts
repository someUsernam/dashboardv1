"use server";

import { clerkClient } from "@clerk/nextjs";
import { db } from "../db";

export async function deleteUser(userId: string) {
	await clerkClient.users.updateUserMetadata(userId, {
		privateMetadata: { role: undefined },
	});
	return await db.user.delete({ where: { id: userId } });
}
