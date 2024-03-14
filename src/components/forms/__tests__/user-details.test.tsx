import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import UserDetails, { UserDetailsProps } from "../user-details";

const DEFAULT_PROPS: UserDetailsProps = {
	type: "agency",
	id: "1",
};

const DEFAULT_CREATE_SUT_PROPS = {
	props: DEFAULT_PROPS,
};

interface CreateSutProps {
	props: UserDetailsProps;
}

vi.mock("@clerk/nextjs", () => {
	return {
		currentUser: () =>
			Promise.resolve({
				emailAddresses: [
					{
						emailAddress: "redneck@email.com",
					},
				],
			}),
	};
});

const createSut = ({
	props = DEFAULT_PROPS,
}: CreateSutProps = DEFAULT_CREATE_SUT_PROPS) => {
	return render(<UserDetails {...props} />);
};

describe("user details", () => {
	it("should render ", () => {
		createSut();

		expect(screen.getByText("User Details")).toBeInTheDocument();
	});

	it("should render user name when user is passed to the component", () => {
		createSut({
			props: {
				...DEFAULT_PROPS,
				userData: {
					name: "SOME_USER_NAME",
				},
			},
		});

		expect(screen.getByRole("textbox", { name: "User full name" })).toHaveValue(
			"SOME_USER_NAME",
		);
	});

	it.only("should save user details", async () => {
		// given
		const res = createSut({
			props: {
				...DEFAULT_PROPS,
				userData: {
					name: "SOME_USER_NAME",
					email: "SOME_EMAIL",
					role: "AGENCY_OWNER",
					avatarUrl: "http://SOME_AVATAR_URL",
				},
			},
		});
		await act(async () => {
			await screen.findByText("User Details");
		});

		// when
		const saveButton = screen.getByRole("button", {
			name: "Save User Details",
		});
		userEvent.click(saveButton);

		// then
		expect(await screen.findByText("Success")).toBeInTheDocument();
	});
});
