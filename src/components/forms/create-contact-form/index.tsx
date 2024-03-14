"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { SubmitButton } from "@ui/submit-button";
import { EmailField, NameField } from "./modules/components/Fields";
import { Header } from "./modules/components/Header";
import { useFormSubit } from "./modules/utils/hooks/useFormSubmit";

type CreateContactFormProps = {
	subaccountId: string;
};

function CreateContactForm({ subaccountId }: CreateContactFormProps) {
	const { form, handleSubmit } = useFormSubit({ subaccountId });

	return (
		<Card className=" w-full">
			<Header />
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<NameField form={form} />
						<EmailField form={form} />
						<SubmitButton
							isSubmitting={form.formState.isSubmitting}
							title="Save Contact"
						/>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default CreateContactForm;
