import ClientForm from './form.client';
import { headers } from 'next/headers';
import Script from 'next/script';

export default function Home() {
	const allHeaders = headers();
	let country = allHeaders.get('x-vercel-ip-country');
	if (country === null) country = 'PK';
	return (
		<>
			<Script defer data-domain="wa.monib.xyz" src="https://analytics-public.monib.xyz/js/script.tagged-events.js"></Script>
			<div className="flex min-h-screen flex-col place-items-center justify-center gap-14">
				<h1 className="text-center text-4xl font-bold sm:w-1/2">
					Send WhatsApp Messages <br /> Hassle-Free
				</h1>
				<div className="flex flex-col gap-4 sm:flex-row">
					<ClientForm initCountry={country} />
				</div>
				<p className="w-10/12 text-center text-lg text-stone-950 sm:w-1/3 sm:text-base">
					WhatsApp Chat Direct is your solution for sending WhatsApp messages without the hassle of saving numbers as contacts. Our user-friendly tool generates API links that open direct chats in WhatsApp, streamlining your messaging experience. Say goodbye to cluttered contact lists and hello to seamless communication.
				</p>
			</div>
		</>
	);
}
