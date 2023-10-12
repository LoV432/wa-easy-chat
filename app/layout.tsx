import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'WhatsApp Chat Direct - Send Messages Without Saving Numbers',
	description: 'WhatsApp without saving numbers. Our API link opens direct chats on WhatsApp, allowing you to send messages hassle-free. No need to save contact details!',
	twitter: {
		card: 'summary'
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="bg-[#128C7E]">
			<body className="bg-[#128C7E]">{children}</body>
		</html>
	);
}
