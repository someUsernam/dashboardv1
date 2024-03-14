"use server";

import { clerkClient } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { db } from "../db";

export async function sendInvitation(
	role: Role,
	email: string,
	agencyId: string,
) {
	const resposne = await db.invitation.create({
		data: { email, agencyId, role },
	});

	try {
		await clerkClient.invitations.createInvitation({
			emailAddress: email,
			redirectUrl: process.env.NEXT_PUBLIC_URL,
			publicMetadata: {
				throughInvitation: true,
				role,
			},
		});
	} catch (error) {
		console.log(error);
		return { error: `Could not send invitation | ${(error as Error).message}` };
	}

	return resposne;
}
