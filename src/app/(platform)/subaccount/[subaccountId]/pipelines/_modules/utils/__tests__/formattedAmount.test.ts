import { formattedAmount } from "../getFormattedAmount";

describe("formattedAmount", () => {
	it("should format amount", () => {
		expect(formattedAmount.format(1000)).toBe("$1,000.00");
	});
});
