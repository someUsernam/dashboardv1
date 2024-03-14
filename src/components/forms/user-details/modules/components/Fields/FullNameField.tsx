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
import { userDetailsFormSchema } from "../../utils/validation/userDetailsFormSchema";

type control = UseFormReturn<z.infer<typeof userDetailsFormSchema>>;

type FullNameFieldProps = {
	form: control;
};

function FullNameField({ form }: FullNameFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="name"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>User full name</FormLabel>
					<FormControl>
						<Input required placeholder="Full Name" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export default FullNameField;
