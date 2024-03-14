"use server";

import { db } from "../db";

export async function getNotificationAndUser(agencyId: string) {
	try {
		return await db.notification.findMany({
			where: { agencyId },
			include: { User: true },
			orderBy: {
				createdAt: "desc",
			},
		});
	} catch (error) {
		console.log(error);
	}
}
