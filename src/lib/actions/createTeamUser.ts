"use server";

import { User } from "@prisma/client";
import { db } from "../db";

export async function createTeamUser(agencyId: string, user: User) {
	if (user.role === "AGENCY_OWNER") return null;
	return await db.user.create({ data: { ...user } });
}