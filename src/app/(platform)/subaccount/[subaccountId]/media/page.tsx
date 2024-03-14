import BlurPage from "@/components/ui/blur-page";
import { getMedia } from "@/lib/queries";
import { Media } from "./_components/Media";

type Props = {
	params: { subaccountId: string };
};

async function Page({ params }: Props) {
	const data = await getMedia(params.subaccountId);
	return (
		<BlurPage>
			<Media data={data} subaccountId={params.subaccountId} />
		</BlurPage>
	);
}

export default Page;
