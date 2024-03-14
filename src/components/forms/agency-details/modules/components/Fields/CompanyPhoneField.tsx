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

type CompanyPhoneFieldProps = {
	form: FormType;
};

function CompanyPhoneField({ form }: CompanyPhoneFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="companyPhone"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>Agency Phone Number</FormLabel>
					<FormControl>
						<Input placeholder="Phone" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { CompanyPhoneField };
