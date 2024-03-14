import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { sendInvitationScheme } from "../../utils/validation/sendInvitationScheme";

type FormType = UseFormReturn<z.infer<typeof sendInvitationScheme>>;

type EmailFieldProps = {
	form: FormType;
};

function RoleField({ form }: EmailFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="role"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel>User role</FormLabel>
					<Select
						onValueChange={(value) => field.onChange(value)}
						defaultValue={field.value}
					>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="Select user role..." />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectItem value="AGENCY_ADMIN">Agency Admin</SelectItem>
							<SelectItem value="SUBACCOUNT_USER">Sub Account User</SelectItem>
							<SelectItem value="SUBACCOUNT_GUEST">
								Sub Account Guest
							</SelectItem>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export { RoleField };
