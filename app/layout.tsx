import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create WA Links',
	description: 'Chat with WhatsApp numbers without the need to add them to your contacts'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="bg-[#128C7E]">
			<body className="flex h-screen w-full place-items-center justify-center bg-[#128C7E] pb-32">{children}</body>
		</html>
	);
}
