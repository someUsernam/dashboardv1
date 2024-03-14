"use server";

import { db } from "../db";

export async function getAgencyByIdAndIncludeSubaccount(agencyId: string) {
	return await db.agency.findUnique({
		where: {
			id: agencyId,
		},
		include: {
			SubAccount: true,
		},
	});
}
