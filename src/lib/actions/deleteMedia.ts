"use server";

import { db } from "../db";

export async function deleteMedia(mediaId: string) {
	return await db.media.delete({
		where: {
			id: mediaId,
		},
	});
}
