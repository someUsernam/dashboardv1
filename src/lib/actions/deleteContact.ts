"use server";

import { db } from "../db";

export async function deleteContact(contactId: string) {
	return await db.contact.delete({ where: { id: contactId } });
}
