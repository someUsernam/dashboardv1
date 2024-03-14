"use server";

import { Agency } from "@prisma/client";
import { db } from "../db";

export async function updateAgencyDetails(
	agencyId: string,
	agencyDetails: Partial<Agency>,
) {
	return await db.agency.update({
		where: { id: agencyId },
		data: { ...agencyDetails },
	});
}
