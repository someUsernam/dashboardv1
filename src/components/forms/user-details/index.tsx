"use client";

import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import { SubAccount, User } from "@prisma/client";
import { Card, CardContent } from "@ui/card";
import AvatarField from "./modules/components/Fields/AvatarField";
import EmailField from "./modules/components/Fields/EmailField";
import FullNameField from "./modules/components/Fields/FullNameField";
import RoleField from "./modules/components/Fields/RoleField";
import { Header } from "./modules/components/Header";
import { UserPermissions } from "./modules/components/UserPermissions";
import { useFetchUserDetails } from "./modules/utils/hooks/useFetchUserDetails";
import { useFormSubmit } from "./modules/utils/hooks/useFormSubmit";

export type UserDetailsProps = {
	id: string | null;
	type: "agency" | "subaccount";
	userData?: Partial<User>;
	subAccounts?: SubAccount[];
};

function UserDetails({ id, type, subAccounts, userData }: UserDetailsProps) {
	const authUserData = useFetchUserDetails(userData);
	const { form, handleSubmit } = useFormSubmit(userData, id, authUserData);

	return (
		<Card className="w-full">
			<Header />
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<AvatarField form={form} />
						<FullNameField form={form} />
						<EmailField form={form} />
						<RoleField form={form} userData={userData} />

						<SubmitButton isSubmitting={form.formState.isSubmitting} />
						{authUserData?.role === "AGENCY_OWNER" && (
							<UserPermissions
								type={type}
								subAccounts={subAccounts}
								userData={userData}
								authUserData={authUserData}
								subAccountId={id}
							/>
						)}
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default UserDetails;
