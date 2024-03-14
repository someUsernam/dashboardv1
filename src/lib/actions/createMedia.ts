"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

export const createMedia = async (
	subaccountId: string,
	mediaFile: Prisma.MediaCreateWithoutSubaccountInput,
) =>
	await db.media.create({
		data: {
			link: mediaFile.link,
			name: mediaFile.name,
			subAccountId: subaccountId,
		},
	});
