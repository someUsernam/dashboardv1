import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createTicketFormSchema } from "../../utils/validation/createTicktetFormSchema";

type FormType = UseFormReturn<z.infer<typeof createTicketFormSchema>>;

type NameFieldProps = {
	form: FormType;
};

function NameField({ form }: NameFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="name"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Ticket Name</FormLabel>
					<FormControl>
						<Input placeholder="Name" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { NameField };
