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

type EmailFieldProps = {
	form: FormType;
};

function EmailField({ form }: EmailFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="email"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Email</FormLabel>
					<FormControl>
						<Input type="email" placeholder="Email" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { EmailField };
