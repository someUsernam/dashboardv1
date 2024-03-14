"use client";

import {
	deleteSubAccount,
	getSubaccountDetails,
	saveActivityLogsNotification,
} from "@/lib/queries";
import { useRouter } from "next/navigation";

type Props = {
	subaccountId: string;
};

function DeleteButton({ subaccountId }: Props) {
	const router = useRouter();

	const handleSubaccountDetails = async () => {
		const res = await getSubaccountDetails(subaccountId);
		await saveActivityLogsNotification({
			agencyId: undefined,
			description: `Deleted Subaccount | ${res?.name}`,
			subaccountId: subaccountId,
		});

		await deleteSubAccount(subaccountId);

		router.refresh();
	};

	const handleSubaccountDetailsEnterKeyDown = async (
		e: React.KeyboardEvent<HTMLDivElement>,
	) => {
		if (e.key === "Enter") {
			const res = await getSubaccountDetails(subaccountId);
			await saveActivityLogsNotification({
				agencyId: undefined,
				description: `Deleted Subaccount ${res?.name}`,
				subaccountId: subaccountId,
			});

			await deleteSubAccount(subaccountId);

			router.refresh();
		}
	};

	return (
		<div
			onClick={handleSubaccountDetails}
			onKeyDown={handleSubaccountDetailsEnterKeyDown}
		>
			Delete
		</div>
	);
}

export { DeleteButton };
