import { db } from "@/lib/db";

export async function getSubaccountById(subaccountId: string) {
	return await db.subAccount.findUnique({
		where: { id: subaccountId },
	});
}
