import { z } from "zod";

export const createPipelineFormSchema = z.object({
	name: z.string().min(1),
});
