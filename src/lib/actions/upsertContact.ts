"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

export async function upsertContact(
	contact: Prisma.ContactUncheckedCreateInput,
) {
	return await db.contact.upsert({
		where: { id: contact.id || crypto.randomUUID() },
		update: contact,
		create: contact,
	});
}
