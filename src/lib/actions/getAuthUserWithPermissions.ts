"use server";

import { db } from "@/lib/db";
import { getCurrentUserEmail } from "./getCurrentUserEmail";

export async function getAuthUserWithPermissions() {
	const email = await getCurrentUserEmail();
	if (!email) {
		return;
	}

	return await db.user.findUnique({
		where: {
			email: email,
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
