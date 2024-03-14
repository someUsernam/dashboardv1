"use client";
import SubAccountDetailsForm from "@/components/forms/subaccount-details-form";
import { useModal } from "@/providers/modal-provider";
import { Agency, User } from "@prisma/client";
import { Button } from "@ui/button";
import CustomModal from "@ui/custom-modal";
import { PlusCircleIcon } from "lucide-react";

type Props = {
	user: User & {
		Agency: Agency | null;
	};
	id: string;
};

function CreateSubaccountButton({ id, user }: Props) {
	const { setOpen } = useModal();
	const agencyDetails = user.Agency;

	if (!agencyDetails) return;

	return (
		<Button
			className="space-x-4 w-auto mb-4 float-right"
			onClick={() => {
				setOpen(
					<CustomModal
						title="Create a Subaccount"
						subheading="Subaccounts are separate accounts that can be used to manage different clients"
					>
						<SubAccountDetailsForm
							agencyDetails={agencyDetails}
							userId={user.id}
							userName={user.name}
						/>
					</CustomModal>,
				);
			}}
		>
			<PlusCircleIcon size={15} />
			<p>Create Sub Account</p>
		</Button>
	);
}

export default CreateSubaccountButton;
