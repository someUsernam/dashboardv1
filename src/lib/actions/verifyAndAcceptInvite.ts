"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "../db";
import { createTeamUser } from "./createTeamUser";
import { createUserActivityNotification } from "./createUserActivityNotification";

export async function verifyAndAcceptInvite() {
	const user = await currentUser();
	if (!user) return redirect("/sign-in");
	const invitationExists = await db.invitation.findUnique({
		where: {
			email: user.emailAddresses[0].emailAddress,
			status: "PENDING",
		},
	});

	if (invitationExists) {
		const userDetails = await createTeamUser(invitationExists.agencyId, {
			email: invitationExists.email,
			agencyId: invitationExists.agencyId,
			avatarUrl: user.imageUrl,
			id: user.id,
			name: `${user.firstName} ${user.lastName}`,
			role: invitationExists.role,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		await createUserActivityNotification({
			agencyId: invitationExists?.agencyId,
			description: "Joined",
			subaccountId: undefined,
		});

		if (userDetails) {
			await clerkClient.users.updateUserMetadata(user.id, {
				privateMetadata: {
					role: userDetails.role || "SUBACCOUNT_USER",
				},
			});

			await db.invitation.delete({
				where: { email: userDetails.email },
			});

			return userDetails.agencyId;
		}
		return null;
	}
	const agency = await db.user.findUnique({
		where: {
			email: user.emailAddresses[0].emailAddress,
		},
	});
	return agency ? agency.agencyId : null;
}
