"use server";

import { db } from "../db";

export async function getUserPermissions(userId: string) {
	return await db.user.findUnique({
		where: { id: userId },
		select: { Permissions: { include: { SubAccount: true } } },
	});
}
