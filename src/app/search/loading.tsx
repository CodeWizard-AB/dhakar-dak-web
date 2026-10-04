export default function SearchLoading() {
	return (
		<div className="min-w-0 animate-pulse pb-12 sm:pb-20" aria-label="Loading search">
			<div className="border-b border-border py-10 sm:py-14">
				<div className="h-3 w-36 bg-muted" />
				<div className="mt-4 h-10 w-72 max-w-full bg-muted sm:h-14 sm:w-96" />
				<div className="mt-4 h-4 w-full max-w-xl bg-muted" />
			</div>
			<div className="my-6 h-14 bg-muted" />
			<div className="space-y-5 py-6">
				{[0, 1, 2].map((item) => (
					<div
						key={item}
						className="grid gap-4 border-b border-border pb-5 sm:grid-cols-[180px_minmax(0,1fr)]"
					>
						<div className="aspect-16/10 bg-muted sm:aspect-4/3" />
						<div className="space-y-3 self-center">
							<div className="h-3 w-28 bg-muted" />
							<div className="h-6 w-full max-w-lg bg-muted" />
							<div className="h-4 w-full max-w-xl bg-muted" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
