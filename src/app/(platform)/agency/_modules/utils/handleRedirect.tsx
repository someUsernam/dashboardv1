import { getAuthUserDetails } from "@/lib/queries";
import { Plan, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

type SearchParams = { plan: Plan; state: string; code: string };

const URLSeparator = "___";

const redirectToSubAccount = () => redirect("/subaccount");
const redirectToAgencyBilling = (agencyId: string, plan: Plan) =>
	redirect(`/agency/${agencyId}/billing?plan=${plan}`);
const redirectToAgencyState = (state: string, code: string) => {
	const [statePath, stateAgencyId] = state.split(URLSeparator);
	if (!stateAgencyId) return <div>Not authorized</div>;
	return redirect(`/agency/${stateAgencyId}/${statePath}?code=${code}`);
};
const redirectToAgency = (agencyId: string) => redirect(`/agency/${agencyId}`);

export function handleRedirect(
	agencyId: string | null,
	user: Prisma.PromiseReturnType<typeof getAuthUserDetails>,
	searchParams: SearchParams,
) {
	if (agencyId) {
		if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
			return redirectToSubAccount();
		}
		if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
			if (searchParams.plan) {
				return redirectToAgencyBilling(agencyId, searchParams.plan);
			}
			if (searchParams.state) {
				return redirectToAgencyState(searchParams.state, searchParams.code);
			}
			return redirectToAgency(agencyId);
		}
		return <div>Not authorized</div>;
	}
}
