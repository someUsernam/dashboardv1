import FileUpload from "@/components/ui/file-upload";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { userDetailsFormSchema } from "../../utils/validation/userDetailsFormSchema";

type control = UseFormReturn<z.infer<typeof userDetailsFormSchema>>;

type AvatarFieldProps = {
	form: control;
};

function AvatarField({ form }: AvatarFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="avatarUrl"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Profile picture</FormLabel>
					<FormControl>
						<FileUpload
							apiEndpoint="avatar"
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
export default AvatarField;
