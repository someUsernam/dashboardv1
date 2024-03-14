import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { uploadMediaFormSchema } from "../../utils/validation/uploadMediaFormSchema";
import FileUpload from "@/components/ui/file-upload";

type FormType = UseFormReturn<z.infer<typeof uploadMediaFormSchema>>;

type LinkFieldProps = {
	form: FormType;
};

function LinkField({ form }: LinkFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="link"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Media File</FormLabel>
					<FormControl>
						<FileUpload
							apiEndpoint="subaccountLogo"
							value={field.value}
							onChange={field.onChange}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { LinkField };
