import AgencyDetails from "@/components/forms/agency-details";
import { getCurrentUserEmail } from "@/lib/actions";
import { getAuthUserDetails, verifyAndAcceptInvite } from "@/lib/queries";
import { Plan } from "@prisma/client";
import { handleRedirect } from "./_modules/utils/handleRedirect";

type Props = {
	searchParams: { plan: Plan; state: string; code: string };
};

async function Page({ searchParams }: Props) {
	const [agencyId, user, email] = await Promise.all([
		verifyAndAcceptInvite(),
		getAuthUserDetails(),
		getCurrentUserEmail(),
	]);

	handleRedirect(agencyId, user, searchParams);

	return (
		<div className="flex flex-col md:flex-row mx-auto gap-4 max-w-7xl p-4 justify-center items-center">
			<header className="place-self-start space-y-4">
				<h1 className="text-4xl">Create An Agency</h1>
				<p className="text-muted-foreground">
					Please fill in the details below to create your agency. You can add
					more details later.
				</p>
			</header>
			<AgencyDetails data={{ companyEmail: email }} />
		</div>
	);
}

export default Page;
