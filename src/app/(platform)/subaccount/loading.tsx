import { Loader2 } from "lucide-react";

function loading() {
	return (
		<div className="flex h-full items-center justify-center">
			<Loader2 className=" size-10 animate-spin text-primary" />
		</div>
	);
}
export default loading;
