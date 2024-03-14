import { Loader2 } from "lucide-react";
import { Button } from "./button";

type SubmitButtonProps = {
	isSubmitting: boolean;
	title?: string;
};

function SubmitButton({ isSubmitting, title = "Save" }: SubmitButtonProps) {
	return (
		<Button disabled={isSubmitting} type="submit">
			{isSubmitting && <Loader2 className="animate-spin mr-2" />}
			{title}
		</Button>
	);
}
export { SubmitButton };
