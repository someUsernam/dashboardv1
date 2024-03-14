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
import { uploadMediaFormSchema } from "../../utils/validation/uploadMediaFormSchema";

type FormType = UseFormReturn<z.infer<typeof uploadMediaFormSchema>>;

type NameFieldProps = {
	form: FormType;
};

function NameField({ form }: NameFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="name"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>File Name</FormLabel>
					<FormControl>
						<Input placeholder="Your agency name" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { NameField };
