"use client";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useModal } from "@/providers/modal-provider";
import { User } from "@prisma/client";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { userDetailsFormSchema } from "../../utils/validation/userDetailsFormSchema";

type control = UseFormReturn<z.infer<typeof userDetailsFormSchema>>;

type RoleFieldProps = {
	form: control;
	userData?: Partial<User>;
};

// TODO: roleState

function RoleField({ form, userData }: RoleFieldProps) {
	const { data } = useModal();
	const [roleState, setRoleState] = useState("");

	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="role"
			render={({ field }) => (
				<FormItem className="flex-1">
					<FormLabel> User Role</FormLabel>
					<Select
						disabled={field.value === "AGENCY_OWNER"}
						onValueChange={(value) => {
							if (value === "SUBACCOUNT_USER" || value === "SUBACCOUNT_GUEST") {
								setRoleState(
									"You need to have subaccounts to assign Subaccount access to team members.",
								);
							} else {
								setRoleState("");
							}
							field.onChange(value);
						}}
						defaultValue={field.value}
					>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="Select user role..." />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectItem value="AGENCY_ADMING">Agency Admin</SelectItem>
							{(data?.user?.role === "AGENCY_OWNER" ||
								userData?.role === "AGENCY_OWNER") && (
								<SelectItem value="AGENCY_OWNER">Agency Owner</SelectItem>
							)}
							<SelectItem value="SUBACCOUNT_USER">Sub Account User</SelectItem>
							<SelectItem value="SUBACCOUNT_GUEST">
								Sub Account Guest
							</SelectItem>
						</SelectContent>
					</Select>
					<p className="text-muted-foreground">{roleState}</p>
				</FormItem>
			)}
		/>
	);
}
export default RoleField;
