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

type CountryFiledProps = {
	form: FormType;
};

function CountryFiled({ form }: CountryFiledProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="country"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>Country</FormLabel>
					<FormControl>
						<Input required placeholder="Country" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { CountryFiled };
