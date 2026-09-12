export default async function Section({ params }: { params: Promise<{ section: string }> }) {
	const { section } = await params;

	return (
		<div>
			<h1>{section}</h1>
		</div>
	);
}
