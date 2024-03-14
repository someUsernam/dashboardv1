"use server";

import { db } from "../db";

export async function changeUserPermissions(
	permissionId: string | undefined,
	userEmail: string,
	subAccountId: string,
	permission: boolean,
) {
	try {
		return await db.permissions.upsert({
			where: { id: permissionId },
			update: { access: permission },
			create: {
				access: permission,
				email: userEmail,
				subAccountId: subAccountId,
			},
		});
	} catch (error) {
		console.log("Could not change persmission", error);
	}
}
