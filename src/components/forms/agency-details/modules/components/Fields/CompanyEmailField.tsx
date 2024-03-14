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

type CompanyEmailFieldProps = {
	form: FormType;
};

function CompanyEmailField({ form }: CompanyEmailFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="companyEmail"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>Agency Email</FormLabel>
					<FormControl>
						<Input readOnly placeholder="Email" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { CompanyEmailField };
