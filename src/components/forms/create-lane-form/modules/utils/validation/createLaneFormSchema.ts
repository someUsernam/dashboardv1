import { z } from "zod";

export const createLaneFormSchema = z.object({
	name: z.string().min(1),
});
