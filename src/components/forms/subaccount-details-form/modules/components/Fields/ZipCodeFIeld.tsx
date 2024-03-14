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

type ZipCodeFIeldProps = {
	form: FormType;
};

function ZipCodeFIeld({ form }: ZipCodeFIeldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="zipCode"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>Zipcpde</FormLabel>
					<FormControl>
						<Input required placeholder="Zipcode" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { ZipCodeFIeld };
