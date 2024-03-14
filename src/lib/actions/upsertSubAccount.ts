"use server";

import { SubAccount } from "@prisma/client";
import { db } from "../db";

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
