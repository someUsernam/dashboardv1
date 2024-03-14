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
import { subaccountDetailsFormSchema } from "../../utils/validation/subaccountDetailsFormSchema";

type FormType = UseFormReturn<z.infer<typeof subaccountDetailsFormSchema>>;

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
					<FormLabel>Acount Phone Number</FormLabel>
					<FormControl>
						<Input placeholder="Phone" required {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { CompanyPhoneField };
