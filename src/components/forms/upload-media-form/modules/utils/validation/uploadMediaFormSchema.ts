import { z } from "zod";

export const uploadMediaFormSchema = z.object({
	link: z.string().min(1, { message: "Media File is required" }),
	name: z.string().min(1, { message: "Name is required" }),
});
