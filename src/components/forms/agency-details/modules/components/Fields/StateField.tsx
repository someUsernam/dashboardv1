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

type StateFieldProps = {
	form: FormType;
};

function StateField({ form }: StateFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="state"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>State</FormLabel>
					<FormControl>
						<Input placeholder="State" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { StateField };
