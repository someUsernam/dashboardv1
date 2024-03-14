import "@testing-library/jest-dom/vitest";

beforeAll(() => {
	vi.mock("next/navigation", () => require("next-router-mock"));
});
