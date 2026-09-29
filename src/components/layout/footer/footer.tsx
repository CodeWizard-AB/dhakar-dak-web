import { contactDetails, socialIcons } from "@/lib/constants/footer-data";

export default function Footer() {
	return (
		<footer className="bg-[#f3f2ef] text-[#202936]">
			<div className="mx-auto grid container gap-10 px-5 py-12 sm:px-8 md:grid-cols-12 md:gap-8 md:py-14">
				<div className="md:col-span-5">
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b42336]">
						Independent Bengali journalism
					</p>
					<p className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
						The Daily Dhakar Dak
					</p>
					<p className="mt-4 max-w-xl text-sm leading-7 text-[#59616b]">
						The Daily Dhakar Dak is a leading Bengali news platform, delivering
						reliable and timely news through both print and online channels.
						With a commitment to truth and transparency, we cover everything
						from local stories to global events, keeping the Bengali-speaking
						community informed and engaged.
					</p>
				</div>

				<div className="border-t border-[#d9d7d2] pt-7 md:col-span-3 md:border-l md:border-t-0 md:pl-8 md:pt-0">
					<h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#747a82]">
						Editor and Publisher
					</h2>
					<p className="mt-4 font-serif text-lg leading-7">
						A, B, M, Shamsul Hasan Hiru
					</p>
				</div>

				<div className="border-t border-[#d9d7d2] pt-7 md:col-span-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
					<h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#747a82]">
						Get in touch
					</h2>
					<ul className="mt-4 space-y-4">
						{contactDetails.map(
							({
								Icon,
								label,
								value,
								href,
								additionalHref,
								additionalValue,
							}) => (
								<li
									key={label}
									className="flex items-start gap-3 text-sm leading-6"
								>
									<Icon
										aria-hidden="true"
										className="mt-1 size-4 shrink-0 text-[#b42336]"
									/>
									<div>
										{label !== "Email" && label !== "Telephone" && (
											<p className="font-medium">{label}</p>
										)}
										{href ? (
											<>
												<a
													href={href}
													className="text-[#414a56] underline-offset-4 hover:text-[#b42336] hover:underline"
												>
													{value}
												</a>
												{additionalHref && additionalValue && (
													<>
														{", "}
														<a
															href={additionalHref}
															className="text-[#414a56] underline-offset-4 hover:text-[#b42336] hover:underline"
														>
															{additionalValue}
														</a>
													</>
												)}
											</>
										) : (
											<p className="text-[#414a56]">{value}</p>
										)}
									</div>
								</li>
							),
						)}
					</ul>
				</div>
			</div>

			<div className="bg-[#252d38] text-white">
				<div className="mx-auto flex container flex-col items-center gap-5 px-5 py-5 text-center sm:px-8 md:flex-row md:justify-between md:text-left">
					<p className="text-sm text-white/80">
						© {new Date().getFullYear()} Daily Dhakar Dak. All rights reserved.
					</p>
					<div
						className="flex items-center gap-3"
						role="group"
						aria-label="Social media"
					>
						{socialIcons.map(({ label, Icon }) => (
							<span
								key={label}
								aria-label={label}
								role="img"
								title={label}
								className="flex size-9 items-center justify-center rounded-full border border-white/35 text-white"
							>
								<Icon aria-hidden="true" className="size-4" />
							</span>
						))}
					</div>
					<p className="text-sm text-white/80">
						In implementing the portal:{" "}
						<span className="font-semibold text-[#4b9bff]">GalaHorn</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
