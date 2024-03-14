import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Header() {
	return (
		<CardHeader>
			<CardTitle>Invitation</CardTitle>
			<CardDescription>
				An invitation will be sent to the user. Users who already have an
				invitation sent out to their email, will not receive another invitation.
			</CardDescription>
		</CardHeader>
	);
}
export default Header;
