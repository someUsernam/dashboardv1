"use server";

import { db } from "../db";

export async function deletePipeline(pipelineId: string) {
	return await db.pipeline.delete({
		where: { id: pipelineId },
	});
}
