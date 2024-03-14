"use server";

import { db } from "../db";

export async function deleteSubAccount(subaccountId: string) {
	return await db.subAccount.delete({
		where: { id: subaccountId },
	});
}
