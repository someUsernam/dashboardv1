"use server";

import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUserEmail = async () => {
	const user = await currentUser();
	return user ? user.emailAddresses[0].emailAddress : undefined;
};
