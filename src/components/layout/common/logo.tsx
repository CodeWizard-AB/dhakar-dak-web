import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<Link href="/" className="block">
			{/* Light mode */}
			<Image
				src="/logo-white.png"
				alt="Daily Dhakar Daak"
				width={300}
				height={100}
				className="h-auto w-45 dark:hidden"
				priority
			/>

			{/* Dark mode */}
			<Image
				src="/logo-dark.jpeg"
				alt="Daily Dhakar Daak"
				width={300}
				height={100}
				className="hidden h-auto w-45 dark:block"
				priority
			/>
		</Link>
	);
}
