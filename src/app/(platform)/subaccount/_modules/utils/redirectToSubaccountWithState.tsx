
import { redirect } from "next/navigation";
import { stripeSplitState } from "./consts";
import Unauthorized from "@/components/unauthorized";

export async function redirectToSubaccountWithState(state: string, code: string) {
	const [statePath, stateSubaccountId] = state.split(stripeSplitState);
	if (!stateSubaccountId) {
		return <Unauthorized />;
	}
	return redirect(`/subaccount/${stateSubaccountId}/${statePath}?code=${code}`);
}