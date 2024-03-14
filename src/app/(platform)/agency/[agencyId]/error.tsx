"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="h-full grid place-items-center">
			<h2>Something went wrong!</h2>
			<Button onClick={() => reset()}>Try again</Button>
		</div>
	);
}

export default ErrorPage;
