import { randomColor } from "../getRandomColor";

describe("getRandomColor", () => {
	it("should return a random color", () => {
		expect(randomColor).toMatch(/^#[0-9a-f]{6}$/);
	});
});
