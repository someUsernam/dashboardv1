"use client";

import { Form } from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card";

import { SubmitButton } from "@/components/ui/submit-button";
import { Agency, SubAccount } from "@prisma/client";
import {
	AddressField,
	CityField,
	CompanyEmailField,
	CompanyPhoneField,
	CountryFiled,
	NameField,
	StateField,
	SubAccountLogoField,
	ZipCodeFIeld,
} from "./modules/components/Fields";
import { Header } from "./modules/components/Header";
import { useFormSubmit } from "./modules/utils/hooks/useFormSubmit";

interface Props {
	//Todo: add the sub account to the agency
	agencyDetails: Agency;
	details?: Partial<SubAccount>;
	userId: string;
	userName: string;
}

function SubAccountDetailsForm({
	details,
	agencyDetails,
	userId,
	userName,
}: Props) {
	const { form, handleSubmit } = useFormSubmit(
		details,
		agencyDetails,
		userName,
	);

	return (
		<Card className="w-full">
			<Header />
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<SubAccountLogoField form={form} />
						<div className="flex md:flex-row gap-4">
							<NameField form={form} />
							<CompanyEmailField form={form} />
						</div>
						<div className="flex md:flex-row gap-4">
							<CompanyPhoneField form={form} />
						</div>
						<AddressField form={form} />
						<div className="flex md:flex-row gap-4">
							<CityField form={form} />
							<StateField form={form} />
							<ZipCodeFIeld form={form} />
						</div>
						<CountryFiled form={form} />
						<SubmitButton isSubmitting={form.formState.isSubmitting} />
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default SubAccountDetailsForm;
