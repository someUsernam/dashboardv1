"use server";

import { db } from "../db";

export async function getMedia(subaccountId: string) {
	return await db.subAccount.findUnique({
		where: {
			id: subaccountId,
		},
		include: { Media: true },
	});
}
