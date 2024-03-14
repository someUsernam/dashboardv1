import { z } from "zod";

export const createContactFormSchema = z.object({
	name: z.string().min(1, "Required"),
	email: z.string().email(),
});
