export default async function Article({ params }: { params: Promise<{ article: string }> }) {
	const { article } = await params;

	return (
		<div>
			<h1>{article}</h1>
		</div>
	);
}
