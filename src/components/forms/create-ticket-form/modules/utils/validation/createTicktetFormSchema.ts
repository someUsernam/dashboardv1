import { z } from "zod";

const currencyNumberRegex = /^\d+(\.\d{1,2})?$/;

export const createTicketFormSchema = z.object({
	name: z.string().min(1).max(255),
	description: z.string().optional(),
	value: z.string().refine((value) => currencyNumberRegex.test(value), {
		message: "Value must be a valid price.",
	}),
});
