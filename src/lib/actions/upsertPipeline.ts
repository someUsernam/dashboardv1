"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

export async function upsertPipeline(
	pipeline: Prisma.PipelineUncheckedCreateWithoutLaneInput,
) {
	await db.pipeline.upsert({
		where: { id: pipeline.id || crypto.randomUUID() },
		update: pipeline,
		create: pipeline,
	});
}
