"use server";

import { db } from "../db";

export async function getSubaccountDetails(subaccountId: string) {
	return await db.subAccount.findUnique({
		where: { id: subaccountId },
	});
}
