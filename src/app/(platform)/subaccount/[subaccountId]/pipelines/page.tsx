import { createPipeline, getFirstPipeline } from "./_modules/utils/queries";
import { redirectToPipeline } from "./_modules/utils/redirectToPipeline";

type Props = {
	params: { subaccountId: string };
};

async function Page({ params }: Props) {
	const pipelineExists = await getFirstPipeline(params.subaccountId);
	if (pipelineExists)
		redirectToPipeline(params.subaccountId, pipelineExists.id);

	try {
		const response = await createPipeline(params.subaccountId);
		redirectToPipeline(params.subaccountId, response.id);
	} catch (error) {
		throw new Error(`Error creating pipeline | ${(error as Error).message}`);
	}
}

export default Page;
