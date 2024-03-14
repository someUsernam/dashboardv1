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
import { createPipelineFormSchema } from "../../utils/validation/createPipelineFormSchema";

type FormType = UseFormReturn<z.infer<typeof createPipelineFormSchema>>;

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
					<FormLabel>Pipeline Name</FormLabel>
					<FormControl>
						<Input placeholder="Name" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export default NameField;
