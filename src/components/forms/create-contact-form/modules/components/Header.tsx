import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Header() {
	return (
		<CardHeader>
			<CardTitle>Contact Info</CardTitle>
			<CardDescription>
				You can assign tickets to contacts and set a value for each contact in
				the ticket.
			</CardDescription>
		</CardHeader>
	);
}
export { Header };
