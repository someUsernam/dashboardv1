"use client";

import { FormDescription, FormLabel } from "@/components/ui/form";
import {
	saveActivityLogsNotification,
	updateAgencyDetails,
} from "@/lib/queries";
import { NumberInput } from "@tremor/react";
import { useRouter } from "next/navigation";

type AgencyGoalProps = {
	agencyId: string;
	agencyGoal: number | undefined;
};

function AgencyGoal({ agencyId, agencyGoal }: AgencyGoalProps) {
	const router = useRouter();

	return (
		<div className="flex flex-col gap-2">
			<FormLabel>Create A Goal</FormLabel>
			<FormDescription>
				✨ Create a goal for your agency. As your business grows your goals grow
				too so dont forget to set the bar higher!
			</FormDescription>
			<NumberInput
				defaultValue={agencyGoal}
				onValueChange={async (val) => {
					if (!agencyId) return;
					await updateAgencyDetails(agencyId, { goal: val });
					await saveActivityLogsNotification({
						agencyId: agencyId,
						description: `Updated the agency goal to | ${val} Sub Account`,
						subaccountId: undefined,
					});
					router.refresh();
				}}
				min={1}
				className="bg-background border border-input rounded-md"
				placeholder="Sub Account Goal"
			/>
		</div>
	);
}
export { AgencyGoal };
