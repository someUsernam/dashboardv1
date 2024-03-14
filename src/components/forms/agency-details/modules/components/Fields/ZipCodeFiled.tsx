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

type ZipCodeFiledProps = {
	form: FormType;
};

function ZipCodeFiled({ form }: ZipCodeFiledProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="zipCode"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>Zipcpde</FormLabel>
					<FormControl>
						<Input placeholder="Zipcode" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { ZipCodeFiled };
