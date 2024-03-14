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
import { agencyDetailsFormSchema } from "../../utils/validation/agencyDetailsFormSchema";

type FormType = UseFormReturn<z.infer<typeof agencyDetailsFormSchema>>;

type AgencyLogoFieldProps = {
	form: FormType;
};

function AgencyLogoField({ form }: AgencyLogoFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="agencyLogo"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Agency Logo</FormLabel>
					<FormControl>
						<FileUpload
							apiEndpoint="agencyLogo"
							onChange={field.onChange}
							value={field.value}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { AgencyLogoField };
