import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create WA Links',
	description: 'Create WA links that lets you chat with number without adding them to contact'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
