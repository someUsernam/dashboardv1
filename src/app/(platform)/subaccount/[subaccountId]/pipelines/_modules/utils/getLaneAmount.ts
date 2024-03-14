import { TicketWithTags } from "@/lib/types";

export function getLaneAmount(tickets: TicketWithTags) {
	return tickets.reduce((sum: number, ticket) => sum + (ticket.value || 0), 0);
}
