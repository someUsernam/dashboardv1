"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import { Pipeline } from "@prisma/client";
import { NameField } from "./modules/components/Fields";
import { Header } from "./modules/components/Header";
import { useFormSubmit } from "./modules/utils/hooks/useFormSubmit";

interface CreatePipelineFormProps {
	defaultData?: Pipeline;
	subAccountId: string;
}

const CreatePipelineForm: React.FC<CreatePipelineFormProps> = ({
	defaultData,
	subAccountId,
}) => {
	const { form, handleSubmit } = useFormSubmit(defaultData, subAccountId);

	return (
		<Card className="w-full ">
			<Header />
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<NameField form={form} />
						<SubmitButton
							isSubmitting={form.formState.isSubmitting}
							title="Save Pipeline"
						/>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default CreatePipelineForm;
