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

type CityFieldProps = {
	form: FormType;
};

function CityField({ form }: CityFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="city"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>City</FormLabel>
					<FormControl>
						<Input placeholder="City" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { CityField };
