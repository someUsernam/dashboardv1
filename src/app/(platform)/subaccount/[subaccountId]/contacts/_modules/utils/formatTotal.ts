import { Ticket } from "@prisma/client";

export function formatTotal(tickets: Ticket[]) {
	if (!tickets || tickets.length === 0) return "$0.00";
	const amount = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: "USD",
	});

	const laneAmount = tickets.reduce((acc, ticket) => {
		return acc + Number(ticket.value) || 0;
	}, 0);

	return amount.format(laneAmount);
}
