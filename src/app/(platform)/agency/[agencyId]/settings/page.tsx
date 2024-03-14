import AgencyDetails from "@/components/forms/agency-details";
import UserDetails from "@/components/forms/user-details";
import {
	getAgencyByIdAndIncludeSubaccount,
	getCurrentUserEmail,
} from "@/lib/actions";
import { getUserByEmail } from "@/lib/actions/getUserByEmail";
import { redirect } from "next/navigation";
import { type } from "./_modules/consts";

type SettingsPageProps = {
	params: { agencyId: string };
};

// interface FetchDependenciesResult {
// 	result:
// 		| {
// 				authUser: User | null;
// 				userDetails: any;
// 				agencyDetails: any;
// 		  }
// 		| undefined;
// 	isLoading: boolean;
// 	isError: boolean;
// }

// async function executeQueries<T>(
// 	query: (...args: unknown[]) => Promise<T>,
// 	...args: unknown[]
// ): Promise<T | null> {
// 	try {
// 		const result = await query(...args);
// 		return result || null;
// 	} catch (error) {
// 		console.error(error);
// 		throw new Error(`Error while querying data: ${(error as Error).message}`);
// 	}
// }

// const fetchDependencies = async (agencyId: string): FetchDependenciesResult => {
// 	// const
// 	const authUser = await currentUser();
// 	const userDetails = await getUserDetails(authUser);
// 	const agencyDetails = await getAgencyDetails(agencyId);
// };

async function SettingsPage({ params: { agencyId } }: SettingsPageProps) {
	const email = await getCurrentUserEmail();
	if (!email) return redirect("/sign-in");

	const user = await getUserByEmail(email);
	if (!user) return redirect("/sign-in");

	const agencyDetails = await getAgencyByIdAndIncludeSubaccount(agencyId);
	if (!agencyDetails) throw new Error("Agency not found");

	return (
		<div className="flex lg:flex-row flex-col gap-4">
			<AgencyDetails data={agencyDetails} />
			<UserDetails
				type={type}
				id={agencyId}
				subAccounts={agencyDetails?.SubAccount}
				userData={user}
			/>
		</div>
	);
}

export default SettingsPage;
