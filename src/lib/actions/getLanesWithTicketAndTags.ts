"use server";

import { db } from "../db";

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
