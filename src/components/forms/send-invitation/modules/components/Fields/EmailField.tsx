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
import { sendInvitationScheme } from "../../utils/validation/sendInvitationScheme";

type FormType = UseFormReturn<z.infer<typeof sendInvitationScheme>>;

type EmailFieldProps = {
	form: FormType;
};

function EmailField({ form }: EmailFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="email"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>Email</FormLabel>
					<FormControl>
						<Input placeholder="Email" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { EmailField };
