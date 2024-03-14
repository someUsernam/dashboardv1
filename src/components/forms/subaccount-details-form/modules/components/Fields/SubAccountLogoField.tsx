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
import { subaccountDetailsFormSchema } from "../../utils/validation/subaccountDetailsFormSchema";

type FormType = UseFormReturn<z.infer<typeof subaccountDetailsFormSchema>>;

type SubAccountLogoFieldProps = {
	form: FormType;
};

function SubAccountLogoField({ form }: SubAccountLogoFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="subAccountLogo"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Account Logo</FormLabel>
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
export { SubAccountLogoField };
