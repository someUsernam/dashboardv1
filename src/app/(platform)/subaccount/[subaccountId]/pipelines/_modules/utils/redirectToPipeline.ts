import { redirect } from "next/navigation";

export function redirectToPipeline(subAccountId: string, pipelineId: string) {
	return redirect(`/subaccount/${subAccountId}/pipelines/${pipelineId}`);
}
