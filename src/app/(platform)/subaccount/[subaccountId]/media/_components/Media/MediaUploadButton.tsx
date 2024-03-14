"use client";
import UploadMediaForm from "@/components/forms/upload-media-form";
import { useModal } from "@/providers/modal-provider";
import { Button } from "@ui/button";
import CustomModal from "@ui/custom-modal";

type Props = {
	subaccountId: string;
};

function MediaUploadButton({ subaccountId }: Props) {
	const { isOpen, setOpen, setClose } = useModal();

	return (
		<Button
			onClick={() => {
				console.log("MediaUploadButton clicked");
				setOpen(
					<CustomModal
						title="Upload Media"
						subheading="Upload a file to your media bucket"
					>
						<UploadMediaForm subaccountId={subaccountId} />
					</CustomModal>,
				);
			}}
		>
			Upload
		</Button>
	);
}

export { MediaUploadButton };
