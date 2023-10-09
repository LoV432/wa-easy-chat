import ClientForm from './form.client';
import { headers } from 'next/headers';

export default function Home() {
	const allHeaders = headers();
	let country = allHeaders.get('x-vercel-ip-country');
	if (country === null) country = 'PK';
	return (
		<div className="flex min-h-screen flex-col place-items-center justify-center gap-14">
			<h1 className="text-center text-4xl font-bold sm:w-1/2">
				Send WhatsApp Messages <br /> Hassle-Free
			</h1>
			<div className="flex flex-col gap-4 sm:flex-row">
				<ClientForm initCountry={country} />
			</div>
			<p className="w-10/12 text-center text-lg sm:w-1/3 sm:text-base">Effortlessly send WhatsApp messages from your computer to any WhatsApp number without the need to add them as contacts. Our simple tool generates API links for seamless communication.</p>
		</div>
	);
}
