"use client";
import CreateContactForm from "@/components/forms/create-contact-form";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "@ui/custom-modal";

type Props = {
	subaccountId: string;
};

function CraeteContactButton({ subaccountId }: Props) {
	const { setOpen } = useModal();

	const handleCreateContact = async () => {
		setOpen(
			<CustomModal
				title="Create Or Update Contact information"
				subheading="Contacts are like customers."
			>
				<CreateContactForm subaccountId={subaccountId} />
			</CustomModal>,
		);
	};

	return <Button onClick={handleCreateContact}>Create Contact</Button>;
}

export { CraeteContactButton };
