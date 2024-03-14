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
import { createContactFormSchema } from "../../utils/validation/createContactFormSchema";

type FormType = UseFormReturn<z.infer<typeof createContactFormSchema>>;

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
					<FormLabel>Name</FormLabel>
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
