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
import { createLaneFormSchema } from "../../utils/validation/createLaneFormSchema";

type FormType = UseFormReturn<z.infer<typeof createLaneFormSchema>>;

type NameFieldProps = {
	form: FormType;
};

function NameField({ form }: NameFieldProps) {
	return (
		<FormField
			disabled={form.formState.isLoading}
			control={form.control}
			name="name"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Lane Name</FormLabel>
					<FormControl>
						<Input placeholder="Lane Name" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { NameField };
