"use server";

import { db } from "../db";

export async function getPipelineDetails(pipelineId: string) {
	return await db.pipeline.findUnique({
		where: {
			id: pipelineId,
		},
	});
}
