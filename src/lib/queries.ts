"use server";

import { clerkClient, currentUser } from "@clerk/nextjs";
import {
	Agency,
	Lane,
	Plan,
	Prisma,
	Role,
	SubAccount,
	Tag,
	Ticket,
	User,
} from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "./db";
import { CreateMediaType } from "./types";

export async function getAuthUserDetails() {
	const user = await currentUser();
	if (!user) {
		return;
	}

	return await db.user.findUnique({
		where: {
			email: user.emailAddresses[0].emailAddress,
		},
		include: {
			Agency: {
				include: {
					SidebarOption: true,
					SubAccount: {
						include: {
							SidebarOption: true,
						},
					},
				},
			},
			Permissions: true,
		},
	});
}

export async function saveActivityLogsNotification({
	agencyId,
	description,
	subaccountId,
}: {
	agencyId?: string;
	description: string;
	subaccountId?: string;
}) {
	const authUser = await currentUser();
	let userData: User | null = null;
	if (!authUser) {
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
			where: { email: authUser?.emailAddresses[0].emailAddress },
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

export async function createTeamUser(agencyId: string, user: User) {
	if (user.role === "AGENCY_OWNER") return null;
	return await db.user.create({ data: { ...user } });
}

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
		await saveActivityLogsNotification({
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

export async function updateAgencyDetails(
	agencyId: string,
	agencyDetails: Partial<Agency>,
) {
	return await db.agency.update({
		where: { id: agencyId },
		data: { ...agencyDetails },
	});
}

export async function deleteAgency(agencyId: string) {
	return await db.agency.delete({ where: { id: agencyId } });
}

export async function initUser(newUser: Partial<User>) {
	const user = await currentUser();
	if (!user) return;

	const userData = await db.user.upsert({
		where: {
			email: user.emailAddresses[0].emailAddress,
		},
		update: newUser,
		create: {
			id: user.id,
			avatarUrl: user.imageUrl,
			email: user.emailAddresses[0].emailAddress,
			name: `${user.firstName} ${user.lastName}`,
			role: newUser.role || "SUBACCOUNT_USER",
		},
	});

	await clerkClient.users.updateUserMetadata(user.id, {
		privateMetadata: {
			role: newUser.role || "SUBACCOUNT_USER",
		},
	});

	return userData;
}

export async function upsertAgency(agency: Agency, price?: Plan) {
	if (!agency.companyEmail) return null;
	try {
		return await db.agency.upsert({
			where: {
				id: agency.id,
			},
			update: agency,
			create: {
				users: {
					connect: { email: agency.companyEmail },
				},
				...agency,
				SidebarOption: {
					create: [
						{
							name: "Dashboard",
							icon: "category",
							link: `/agency/${agency.id}`,
						},
						{
							name: "Launchpad",
							icon: "clipboardIcon",
							link: `/agency/${agency.id}/launchpad`,
						},
						{
							name: "Billing",
							icon: "payment",
							link: `/agency/${agency.id}/billing`,
						},
						{
							name: "Settings",
							icon: "settings",
							link: `/agency/${agency.id}/settings`,
						},
						{
							name: "Sub Accounts",
							icon: "person",
							link: `/agency/${agency.id}/all-subaccounts`,
						},
						{
							name: "Team",
							icon: "shield",
							link: `/agency/${agency.id}/team`,
						},
					],
				},
			},
		});
	} catch (error) {
		console.log(error);
	}
}

export async function getNotificationAndUser(agencyId: string) {
	try {
		return await db.notification.findMany({
			where: { agencyId },
			include: { User: true },
			orderBy: {
				createdAt: "desc",
			},
		});
	} catch (error) {
		console.log(error);
	}
}

export async function upsertSubAccount(subAccount: SubAccount) {
	if (!subAccount.companyEmail) return null;
	const agencyOwner = await db.user.findFirst({
		where: {
			Agency: {
				id: subAccount.agencyId,
			},
			role: "AGENCY_OWNER",
		},
	});
	if (!agencyOwner) return console.log("🔴Erorr could not create subaccount");
	const permissionId = crypto.randomUUID();
	return await db.subAccount.upsert({
		where: { id: subAccount.id },
		update: subAccount,
		create: {
			...subAccount,
			Permissions: {
				create: {
					access: true,
					email: agencyOwner.email,
					id: permissionId,
				},
				connect: {
					subAccountId: subAccount.id,
					id: permissionId,
				},
			},
			Pipeline: {
				create: { name: "Lead Cycle" },
			},
			SidebarOption: {
				create: [
					{
						name: "Launchpad",
						icon: "clipboardIcon",
						link: `/subaccount/${subAccount.id}/launchpad`,
					},
					{
						name: "Settings",
						icon: "settings",
						link: `/subaccount/${subAccount.id}/settings`,
					},
					{
						name: "Media",
						icon: "database",
						link: `/subaccount/${subAccount.id}/media`,
					},
					{
						name: "Pipelines",
						icon: "pipelines",
						link: `/subaccount/${subAccount.id}/pipelines`,
					},
					{
						name: "Contacts",
						icon: "person",
						link: `/subaccount/${subAccount.id}/contacts`,
					},
					{
						name: "Dashboard",
						icon: "category",
						link: `/subaccount/${subAccount.id}`,
					},
				],
			},
		},
	});
}

export async function getUserPermissions(userId: string) {
	return await db.user.findUnique({
		where: { id: userId },
		select: { Permissions: { include: { SubAccount: true } } },
	});
}

export async function updateUser(user: Partial<User>) {
	const response = await db.user.update({
		where: { email: user.email },
		data: { ...user },
	});

	await clerkClient.users.updateUserMetadata(response.id, {
		privateMetadata: {
			role: user.role || "SUBACCOUNT_USER",
		},
	});

	return response;
}

export async function changeUserPermissions(
	permissionId: string | undefined,
	userEmail: string,
	subAccountId: string,
	permission: boolean,
) {
	try {
		return await db.permissions.upsert({
			where: { id: permissionId },
			update: { access: permission },
			create: {
				access: permission,
				email: userEmail,
				subAccountId: subAccountId,
			},
		});
	} catch (error) {
		console.log("Could not change persmission", error);
	}
}

export async function getSubaccountDetails(subaccountId: string) {
	return await db.subAccount.findUnique({
		where: { id: subaccountId },
	});
}

export async function deleteSubAccount(subaccountId: string) {
	return await db.subAccount.delete({
		where: { id: subaccountId },
	});
}

export async function deleteUser(userId: string) {
	await clerkClient.users.updateUserMetadata(userId, {
		privateMetadata: { role: undefined },
	});
	return await db.user.delete({ where: { id: userId } });
}

export async function getUser(id: string) {
	return await db.user.findUnique({
		where: { id },
	});
}

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

export async function getMedia(subaccountId: string) {
	return await db.subAccount.findUnique({
		where: {
			id: subaccountId,
		},
		include: { Media: true },
	});
}

export async function createMedia(
	subaccountId: string,
	mediaFile: CreateMediaType,
) {
	return await db.media.create({
		data: {
			link: mediaFile.link,
			name: mediaFile.name,
			subAccountId: subaccountId,
		},
	});
}

export async function deleteMedia(mediaId: string) {
	return await db.media.delete({
		where: {
			id: mediaId,
		},
	});
}

export async function getPipelineDetails(pipelineId: string) {
	return await db.pipeline.findUnique({
		where: {
			id: pipelineId,
		},
	});
}

export async function getLanesWithTicketAndTags(pipelineId: string) {
	return await db.lane.findMany({
		where: {
			pipelineId,
		},
		orderBy: { order: "asc" },
		include: {
			Tickets: {
				orderBy: {
					order: "asc",
				},
				include: {
					Tags: true,
					Assigned: true,
					Customer: true,
				},
			},
		},
	});
}

export async function upsertPipeline(
	pipeline: Prisma.PipelineUncheckedCreateWithoutLaneInput,
) {
	return await db.pipeline.upsert({
		where: { id: pipeline.id || crypto.randomUUID() },
		update: pipeline,
		create: pipeline,
	});
}

export async function deletePipeline(pipelineId: string) {
	return await db.pipeline.delete({
		where: { id: pipelineId },
	});
}

export async function upsertLane(lane: Prisma.LaneUncheckedCreateInput) {
	let order: number;

	if (!lane.order) {
		const lanes = await db.lane.findMany({
			where: {
				pipelineId: lane.pipelineId,
			},
		});

		order = lanes.length;
	} else {
		order = lane.order;
	}

	return await db.lane.upsert({
		where: { id: lane.id || crypto.randomUUID() },
		update: lane,
		create: { ...lane, order },
	});
}

export async function deleteLane(laneId: string) {
	return await db.lane.delete({ where: { id: laneId } });
}

export async function getTicketsWithTags(pipelineId: string) {
	return await db.ticket.findMany({
		where: {
			Lane: {
				pipelineId,
			},
		},
		include: { Tags: true, Assigned: true, Customer: true },
	});
}

export async function _getTicketsWithAllRelations(laneId: string) {
	return await db.ticket.findMany({
		where: { laneId: laneId },
		include: {
			Assigned: true,
			Customer: true,
			Lane: true,
			Tags: true,
		},
	});
}

export async function getSubAccountTeamMembers(subaccountId: string) {
	return await db.user.findMany({
		where: {
			Agency: {
				SubAccount: {
					some: {
						id: subaccountId,
					},
				},
			},
			role: "SUBACCOUNT_USER",
			Permissions: {
				some: {
					subAccountId: subaccountId,
					access: true,
				},
			},
		},
	});
}

export async function searchContacts(searchTerms: string) {
	return await db.contact.findMany({
		where: {
			name: {
				contains: searchTerms,
			},
		},
	});
}

export async function upsertTicket(
	ticket: Prisma.TicketUncheckedCreateInput,
	tags: Tag[],
) {
	const order =
		ticket.order ??
		(await db.ticket.count({ where: { laneId: ticket.laneId } }));

	return await db.ticket.upsert({
		where: {
			id: ticket.id || crypto.randomUUID(),
		},
		update: { ...ticket, Tags: { set: tags } },
		create: { ...ticket, Tags: { connect: tags }, order },
		include: {
			Assigned: true,
			Customer: true,
			Tags: true,
			Lane: true,
		},
	});
}

export async function deleteTicket(ticketId: string) {
	return await db.ticket.delete({
		where: {
			id: ticketId,
		},
	});
}

export async function upsertTag(
	subaccountId: string,
	tag: Prisma.TagUncheckedCreateInput,
) {
	return await db.tag.upsert({
		where: { id: tag.id || crypto.randomUUID(), subAccountId: subaccountId },
		update: tag,
		create: { ...tag, subAccountId: subaccountId },
	});
}

export async function getTagsForSubaccount(subaccountId: string) {
	return await db.subAccount.findUnique({
		where: { id: subaccountId },
		select: { Tags: true },
	});
}

export async function deleteTag(tagId: string) {
	return await db.tag.delete({ where: { id: tagId } });
}

export async function upsertContact(
	contact: Prisma.ContactUncheckedCreateInput,
) {
	return await db.contact.upsert({
		where: { id: contact.id || crypto.randomUUID() },
		update: contact,
		create: contact,
	});
}

export async function updateLanesOrder(lanes: Lane[]) {
	try {
		const updateTrans = lanes.map((lane) =>
			db.lane.update({
				where: {
					id: lane.id,
				},
				data: {
					order: lane.order,
				},
			}),
		);

		await db.$transaction(updateTrans);
	} catch (error) {
		console.log(error, "ERROR UPDATE LANES ORDER");
	}
}

export async function updateTicketsOrder(tickets: Ticket[]) {
	try {
		const updateTrans = tickets.map((ticket) =>
			db.ticket.update({
				where: {
					id: ticket.id,
				},
				data: {
					order: ticket.order,
					laneId: ticket.laneId,
				},
			}),
		);

		await db.$transaction(updateTrans);
	} catch (error) {
		console.log(error, "ERROR UPDATE TICKET ORDER");
	}
}

// async function determineOrder(
// 	dbModel: any,
// 	field: string,
// 	value: any,
// 	order: number | null,
// ): Promise<number> {
// 	if (order !== null) {
// 		return order;
// 	}

// 	const items = await dbModel.findMany({
// 		where: { [field]: value },
// 	});

// 	return items.length;
// }
