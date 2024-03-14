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

type AddressFieldProps = {
	form: FormType;
};

function AddressField({ form }: AddressFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="address"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>Address</FormLabel>
					<FormControl>
						<Input required placeholder="123 st..." {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { AddressField };
