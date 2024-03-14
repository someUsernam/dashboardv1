"use client";
import { Button } from "@/components/ui/button";
import { Plan } from "@prisma/client";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	selectedPriceId: string | Plan;
};

function SubscriptionForm({ selectedPriceId }: Props) {
	const elements = useElements();
	const stripeHook = useStripe();
	const [priceError, setPriceError] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		if (!selectedPriceId) {
			setPriceError("You need to select a plan to subscribe.");
			return;
		}
		setPriceError("");
		event.preventDefault();
		if (!stripeHook || !elements) return;

		try {
			const { error } = await stripeHook.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${process.env.NEXT_PUBLIC_URL}/agency`,
				},
			});
			if (error) {
				throw new Error(`Payment failed: ${error.message}`);
			}
			toast.success("Payment successfull", {
				description: "Your payment has been successfully processed. ",
			});
		} catch (error) {
			console.log(error);
			toast.error("Payment failed", {
				description:
					"We couldnt process your payment. Please try a different card",
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<span className="text-destructive">{priceError}</span>
			<PaymentElement />
			<Button disabled={!stripeHook} className="mt-4 w-full">
				Submit
			</Button>
		</form>
	);
}
export default SubscriptionForm;
