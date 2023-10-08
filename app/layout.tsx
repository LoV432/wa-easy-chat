import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create WA Links',
	description: 'Generate WhatsApp API links to send messages from your computer to any WhatsApp number without adding them as contacts. Simplify communication effortlessly.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="bg-[#128C7E]">
			<body className="bg-[#128C7E]">{children}</body>
		</html>
	);
}
