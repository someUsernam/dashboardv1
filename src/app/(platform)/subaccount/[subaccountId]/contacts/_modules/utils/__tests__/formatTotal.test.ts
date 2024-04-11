import { Ticket } from "@prisma/client";
import { formatTotal } from "../formatTotal";

describe("formatTotal", () => {
	it("should return $0.00 if there are no tickets", () => {
		const tickets: Ticket[] = [];
		const result = formatTotal(tickets);
		expect(result).toBe("$0.00");
	});

	it("should return the sum of all ticket values", () => {
		const tickets = [
			{ value: 1 },
			{ value: 2 },
			{ value: 3 },
		] as unknown as Ticket[];
		const result = formatTotal(tickets);
		expect(result).toBe("$6.00");
	});
});
