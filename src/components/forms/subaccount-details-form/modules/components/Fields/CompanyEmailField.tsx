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
					<FormLabel>Acount Email</FormLabel>
					<FormControl>
						<Input placeholder="Email" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { CompanyEmailField };
