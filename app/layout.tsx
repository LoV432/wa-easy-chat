import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create WA Links',
	description: 'Create WA links that lets you chat with number without adding them to contact'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="bg-[#128C7E]">
			<body className="bg-[#128C7E] h-screen w-full flex justify-center place-items-center pb-32">{children}</body>
		</html>
	);
}
