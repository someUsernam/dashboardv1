"use server";

import { clerkClient } from "@clerk/nextjs";
import { db } from "../db";
import { User } from "@prisma/client";

export async function updateUser(user: Partial<User>) {
	const response = await db.user.update({
		where: { email: user.email },
		data: { ...user },
	});

	await clerkClient.users.updateUserMetadata(response.id, {
		privateMetadata: {
			role: user.role || "SUBACCOUNT_USER",
		},
	});

	return response;
}
