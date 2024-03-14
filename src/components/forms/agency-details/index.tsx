"use client";

import { SubmitButton } from "@/components/ui/submit-button";
import { Agency } from "@prisma/client";
import { Card, CardContent } from "@ui/card";
import { Form } from "@ui/form";
import { AgencyGoal } from "./modules/components/AgencyGoal";
import { DeleteAgencyZone } from "./modules/components/DeleteAgencyZone";
import {
	AddressField,
	AgencyLogoField,
	AgencyNameField,
	CityField,
	CompanyEmailField,
	CompanyPhoneField,
	CountryField,
	StateField,
	WhiteLabelField,
	ZipCodeFiled,
} from "./modules/components/Fields";
import { Header } from "./modules/components/Header";
import { useDeleteAgency } from "./modules/utils/hooks/useDeleteAgency";
import { useFormSubmit } from "./modules/utils/hooks/useFormSubmit";

type AgencyDetailsProps = {
	data?: Partial<Agency>;
};

function AgencyDetails({ data }: AgencyDetailsProps) {
	const { deletingAgency, handleDeleteAgency } = useDeleteAgency(data?.id);
	const { form, handleSubmit } = useFormSubmit(data);

	const isSubmitting = form.formState.isSubmitting;

	return (
		<Card className="w-full">
			<Header />
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<AgencyLogoField form={form} />
						<div className="flex md:flex-row gap-4">
							<AgencyNameField form={form} />
							<CompanyEmailField form={form} />
						</div>
						<div className="flex md:flex-row gap-4">
							<CompanyPhoneField form={form} />
						</div>
						<WhiteLabelField form={form} />
						<AddressField form={form} />
						<div className="flex md:flex-row gap-4">
							<CityField form={form} />
							<StateField form={form} />
							<ZipCodeFiled form={form} />
						</div>
						<CountryField form={form} />
						{data?.id ? (
							<AgencyGoal agencyId={data.id} agencyGoal={data?.goal} />
						) : null}
						<SubmitButton isSubmitting={isSubmitting} />
					</form>
				</Form>
				<DeleteAgencyZone
					agencyId={data?.id}
					handleDeleteAgency={handleDeleteAgency}
					deletingAgency={deletingAgency}
					isSubmitting={isSubmitting}
				/>
			</CardContent>
		</Card>
	);
}

export default AgencyDetails;
