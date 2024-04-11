import { TicketWithTags } from "@/lib/types";
import { getLaneAmount } from "../getLaneAmount";

describe("getLaneAmount", () => {
	it("should return 0 if there are no tickets", () => {
		const tickets: TicketWithTags = [];
		const result = getLaneAmount(tickets);
		expect(result).toBe(0);
	});

	it("should return the sum of all ticket values", () => {
		const tickets = [
			{ value: 1 },
			{ value: 2 },
			{ value: 3 },
		] as unknown as TicketWithTags;
		const result = getLaneAmount(tickets);
		expect(result).toBe(6);
	});
});
