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
import { agencyDetailsFormSchema } from "../../utils/validation/agencyDetailsFormSchema";

type FormType = UseFormReturn<z.infer<typeof agencyDetailsFormSchema>>;

type AgencyNameFieldProps = {
	form: FormType;
};

function AgencyNameField({ form }: AgencyNameFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="name"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>Agency Name</FormLabel>
					<FormControl>
						<Input placeholder="Your agency name" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { AgencyNameField };
