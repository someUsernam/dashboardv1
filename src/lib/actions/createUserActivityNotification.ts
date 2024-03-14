"use server";

import { User } from "@prisma/client";
import { getCurrentUserEmail } from ".";
import { db } from "../db";

export async function createUserActivityNotification({
	agencyId,
	description,
	subaccountId,
}: {
	agencyId?: string;
	description: string;
	subaccountId?: string;
}) {
	const email = await getCurrentUserEmail();
	let userData: User | null = null;
	if (!email) {
		const response = await db.user.findFirst({
			where: {
				Agency: {
					SubAccount: {
						some: { id: subaccountId },
					},
				},
			},
		});

		if (response) {
			userData = response;
		}
	} else {
		userData = await db.user.findUnique({
			where: { email: email },
		});
	}

	if (!userData) {
		console.log("Could not find a user");
		return;
	}

	let foundAgencyId = agencyId;
	if (!foundAgencyId) {
		if (!subaccountId) {
			throw new Error(
				"You need to provide atleast an agency Id or subaccount Id",
			);
		}
		const response = await db.subAccount.findUnique({
			where: { id: subaccountId },
		});
		if (response) foundAgencyId = response.agencyId;
	}
	if (subaccountId) {
		await db.notification.create({
			data: {
				notification: `${userData.name} | ${description}`,
				User: {
					connect: {
						id: userData.id,
					},
				},
				Agency: {
					connect: {
						id: foundAgencyId,
					},
				},
				SubAccount: {
					connect: { id: subaccountId },
				},
			},
		});
	} else {
		await db.notification.create({
			data: {
				notification: `${userData.name} | ${description}`,
				User: {
					connect: {
						id: userData.id,
					},
				},
				Agency: {
					connect: {
						id: foundAgencyId,
					},
				},
			},
		});
	}
}
