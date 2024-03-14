import { Loader2 } from "lucide-react";

function LoadingLayout() {
	return (
		<div className="flex items-center justify-center h-full">
			<Loader2 className="size-10 animate-spin text-primary" />
		</div>
	);
}
export { LoadingLayout };
