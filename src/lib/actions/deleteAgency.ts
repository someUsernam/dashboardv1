"use server";

import { db } from "../db";

export async function deleteAgency(agencyId: string) {
	return await db.agency.delete({ where: { id: agencyId } });
}
