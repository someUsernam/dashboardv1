import { db } from "@/lib/db";
import { cache } from "react";

export const createPipeline = cache((subAccountId: string) =>
	db.pipeline.create({
		data: { name: "First Pipeline", subAccountId: subAccountId },
	}),
);

export const getFirstPipeline = cache((subAccountId: string) =>
	db.pipeline.findFirst({
		where: { subAccountId: subAccountId },
	}),
);

export const getManyPipelines = cache((subAccountId: string) =>
	db.pipeline.findMany({
		where: { subAccountId: subAccountId },
	}),
);
