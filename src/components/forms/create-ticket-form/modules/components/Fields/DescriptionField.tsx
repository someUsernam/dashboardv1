import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createTicketFormSchema } from "../../utils/validation/createTicktetFormSchema";

type FormType = UseFormReturn<z.infer<typeof createTicketFormSchema>>;

type DescriptionFieldProps = {
	form: FormType;
};

function DescriptionField({ form }: DescriptionFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="description"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Description</FormLabel>
					<FormControl>
						<Textarea placeholder="Description" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { DescriptionField };
