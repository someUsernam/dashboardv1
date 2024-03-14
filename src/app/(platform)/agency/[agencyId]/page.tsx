import { SomeChart } from "../_modules/components/some-chart";

type Props = {
	params: { agencyId: string };
};

async function Page({ params: { agencyId } }: Props) {
	return (
		<div>
			<SomeChart />
		</div>
	);
}

export default Page;
