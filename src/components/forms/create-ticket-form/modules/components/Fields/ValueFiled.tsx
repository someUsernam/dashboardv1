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

type ValueFiledProps = {
	form: FormType;
};

function ValueFiled({ form }: ValueFiledProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="value"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Ticket Value</FormLabel>
					<FormControl>
						<Input placeholder="Value" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { ValueFiled };
