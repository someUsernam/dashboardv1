"use client";
import { SubmitButton } from "@/components/ui/submit-button";
import { Card, CardContent } from "@ui/card";
import { Form } from "@ui/form";
import { LinkField, NameField } from "./modules/components/Fileds";
import { Header } from "./modules/components/Header";
import { useFormSubmit } from "./modules/utils/hooks/useFormSubmit";

type Props = {
	subaccountId: string;
};

function UploadMediaForm({ subaccountId }: Props) {
	const { form, handleSubmit } = useFormSubmit(subaccountId);

	return (
		<Card className="w-full">
			<Header />
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<NameField form={form} />
						<LinkField form={form} />
						<SubmitButton
							isSubmitting={form.formState.isSubmitting}
							title="Upload"
						/>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default UploadMediaForm;
