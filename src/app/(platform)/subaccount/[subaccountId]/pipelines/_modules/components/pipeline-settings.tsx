"use client";
import CreatePipelineForm from "@/components/forms/create-pipeline-form";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePipeline, saveActivityLogsNotification } from "@/lib/queries";
import { Pipeline } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PipelineSettings = ({
	pipelineId,
	subaccountId,
	pipelines,
}: {
	pipelineId: string;
	subaccountId: string;
	pipelines: Pipeline[];
}) => {
	const router = useRouter();

	const currPipeline = pipelines.find((p) => p.id === pipelineId);

	const handleDeletePipeline = async () => {
		try {
			await deletePipeline(pipelineId);

			saveActivityLogsNotification({
				agencyId: undefined,
				subaccountId,
				description: `Deleted a Pipeline | ${currPipeline?.name}`,
			});

			toast("Deleted", {
				description: "Deleted a Pipeline",
			});
			router.replace(`/subaccount/${subaccountId}/pipelines`);
		} catch (error) {
			toast.error("Oppse!", {
				description: `Could Delete Pipeline | ${(error as Error).message}`,
			});
		}
	};

	return (
		<AlertDialog>
			<div className="space-y-4 ">
				<AlertDialogTrigger asChild>
					<Button variant="destructive">Delete Pipeline</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeletePipeline}
							className="bg-destructive"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>

				<CreatePipelineForm
					subAccountId={subaccountId}
					defaultData={currPipeline}
				/>
			</div>
		</AlertDialog>
	);
};

export { PipelineSettings };
