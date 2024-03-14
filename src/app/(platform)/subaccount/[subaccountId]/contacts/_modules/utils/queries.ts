import { db } from "@/lib/db";
import { Contact, SubAccount, Ticket } from "@prisma/client";
import { cache } from "react";

type SubAccountWithContacts = SubAccount & {
	Contact: (Contact & { Ticket: Ticket[] })[];
};

export const getContactBySubAccountId = cache(
	async (subaccountId: string) =>
		(await db.subAccount.findUnique({
			where: { id: subaccountId },
			include: {
				Contact: {
					include: {
						Ticket: {
							select: {
								value: true,
							},
						},
					},
					orderBy: {
						createdAt: "asc",
					},
				},
			},
		})) as SubAccountWithContacts,
);
