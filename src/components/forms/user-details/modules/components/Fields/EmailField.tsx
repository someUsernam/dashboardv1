import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { userDetailsFormSchema } from "../../utils/validation/userDetailsFormSchema";

type control = UseFormReturn<z.infer<typeof userDetailsFormSchema>>;

type EmailFieldProps = {
	form: control;
	userData?: Partial<User>;
};

function EmailField({ form, userData }: EmailFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="email"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>Email</FormLabel>
					<FormControl>
						<Input
							readOnly={
								userData?.role === "AGENCY_OWNER" || form.formState.isSubmitting
							}
							placeholder="Email"
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export default EmailField;
