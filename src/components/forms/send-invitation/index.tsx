"use client";
import { SubmitButton } from "@/components/ui/submit-button";
import { Card, CardContent } from "@ui/card";
import { Form } from "@ui/form";
import { EmailField, RoleField } from "./modules/components/Fields";
import Header from "./modules/components/Header";
import { useFormSubmit } from "./modules/utils/hooks/useFormSubmit";

interface SendInvitationProps {
	agencyId: string;
}

function SendInvitation({ agencyId }: SendInvitationProps) {
	const { form, onSubmit } = useFormSubmit(agencyId);

	return (
		<Card>
			<Header />
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<EmailField form={form} />
						<RoleField form={form} />
						<SubmitButton
							isSubmitting={form.formState.isSubmitting}
							title="Send invitation"
						/>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default SendInvitation;
