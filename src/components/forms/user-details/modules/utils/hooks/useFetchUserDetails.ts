import { getAuthUserDetails } from "@/lib/queries";
import { Prisma, User } from "@prisma/client";
import { useEffect, useState } from "react";

export const useFetchUserDetails = (userData: Partial<User> | undefined) => {
	const [authUserData, setAuthUserData] = useState<Prisma.PromiseReturnType<
		typeof getAuthUserDetails
	> | null>(null);

	useEffect(() => {
		if (userData) {
			const fetchDetails = async () => {
				const response = await getAuthUserDetails();
				if (response) setAuthUserData(response);
			};
			fetchDetails();
		}
	}, [userData]);

	return authUserData;
};
