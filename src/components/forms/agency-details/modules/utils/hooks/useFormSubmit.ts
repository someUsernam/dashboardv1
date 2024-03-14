import { initUser, upsertAgency } from "@/lib/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Agency } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { agencyDetailsFormSchema } from "../validation/agencyDetailsFormSchema";

const createCustomer = async (
	values: z.infer<typeof agencyDetailsFormSchema>,
) => {
	const bodyData = {
		email: values.companyEmail,
		name: values.name,
		shipping: {
			address: {
				city: values.city,
				country: values.country,
				line1: values.address,
				postal_code: values.zipCode,
				state: values.zipCode,
			},
			name: values.name,
		},
		address: {
			city: values.city,
			country: values.country,
			line1: values.address,
			postal_code: values.zipCode,
			state: values.zipCode,
		},
	};

	const customerResponse = await fetch("/api/stripe/create-customer", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bodyData),
	});
	const customerData: { customerId: string } = await customerResponse.json();

	return customerData.customerId;
};

export function useFormSubmit(data: Partial<Agency> | undefined) {
	const router = useRouter();

	const form = useForm<z.infer<typeof agencyDetailsFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(agencyDetailsFormSchema),
		defaultValues: {
			name: data?.name || data?.companyEmail?.split("@")[0],
			companyEmail: data?.companyEmail,
			companyPhone: data?.companyPhone,
			whiteLabel: data?.whiteLabel || false,
			address: data?.address,
			city: data?.city,
			zipCode: data?.zipCode,
			state: data?.state,
			country: data?.country,
			agencyLogo: data?.agencyLogo,
		},
	});

	useEffect(() => {
		if (data) {
			form.reset(data);
		}
	}, [data, form.reset]);

	const handleSubmit = async (
		values: z.infer<typeof agencyDetailsFormSchema>,
	) => {
		try {
			let custId = "";
			if (!data?.id) {
				custId = await createCustomer(values);
			}

			const newUserData = await initUser({ role: "AGENCY_OWNER" });
			if (!data?.customerId && !custId) return;

			const response = await upsertAgency({
				id: data?.id ? data.id : crypto.randomUUID(),
				createdAt: new Date(),
				updatedAt: new Date(),
				customerId: data?.customerId || custId || "",
				address: values.address,
				agencyLogo: values.agencyLogo,
				city: values.city,
				companyPhone: values.companyPhone,
				country: values.country,
				name: values.name,
				state: values.state,
				whiteLabel: values.whiteLabel,
				zipCode: values.zipCode,
				companyEmail: values.companyEmail,
				connectAccountId: "",
				goal: 5,
			});

			toast.success("Saved Agency");
			if (data?.id) return router.refresh();
			if (response) {
				return router.refresh();
			}
		} catch (error) {
			toast.error("Error!", {
				description: `could not create agency | ${(error as Error).message}`,
			});
		}
	};

	return { form, handleSubmit };
}
