'use client';
import codes, { ICountryCodeItem } from 'country-calling-code';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
export default function Home() {
	const numberRef = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;
	const dropdownRef = useRef(null) as unknown as React.MutableRefObject<HTMLDetailsElement>;
	const allCountriesRef = useRef(null) as unknown as React.MutableRefObject<HTMLUListElement>;
	const countrySlectorText = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>;
	const searchTermRef = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;
	const [countryCode, setCountryCode] = useState('');
	const [maxCountriesEntries, setMaxCountriesEntries] = useState(0);

	function updateCountryCode(countryCode: string, isoCode2: string) {
		let countryCodeAndImageHTMLCode = `<img class="inline w-4" src="https://flagcdn.com/${isoCode2.toLowerCase()}.svg" alt=""/> ${countryCode}`;
		countrySlectorText.current.innerHTML = countryCodeAndImageHTMLCode;
		setCountryCode(countryCode);
	}

	async function toggleDropDown(e: React.MouseEvent<HTMLDetailsElement>) {
		e.preventDefault();
		if (dropdownRef.current.hasAttribute('open')) {
			closeDropDown();
		} else {
			dropdownRef.current.setAttribute('open', '');
			if (maxCountriesEntries < codes.length) {
				await new Promise((resolve) => setTimeout(resolve, 1));
				setMaxCountriesEntries(codes.length);
			}
		}
	}

	function closeDropDown(e?: React.MouseEvent<HTMLDivElement>) {
		if (e) e.stopPropagation();
		dropdownRef.current.removeAttribute('open');
		searchTermRef.current.value = '';
		hideLiElementsNotInSearch('');
	}

	function hideLiElementsNotInSearch(searchTerm: string) {
		let elements = allCountriesRef.current.children;
		for (let element of elements as unknown as HTMLLIElement[]) {
			if (element.innerHTML.includes(searchTerm.toUpperCase())) {
				element.classList.remove('hidden');
			} else {
				element.classList.add('hidden');
			}
		}
	}

	useEffect(() => {
		(async () => {
			let ipData = await fetch('https://ip.monib.xyz/all', {
				method: 'GET'
			});
			let data = await ipData.json();
			let country = data.country;
			let countryData = codes.find((code) => code.country === country) as (typeof codes)[0];
			if (!countryData) return;
			updateCountryCode(countryData.countryCodes[0], countryData.isoCode2);
		})();
	}, []);

	function generateWhatsappLink() {
		let number = numberRef.current.value;
		let completeNuber = countryCode + number;
		// Remove all spaces and - and + from number
		completeNuber = completeNuber.replace(/\s/g, '');
		completeNuber = completeNuber.replace(/-/g, '');
		completeNuber = completeNuber.replace(/\+/g, '');
		if (process.env.NODE_ENV === 'development') {
			console.log(`https://api.whatsapp.com/send?phone=${countryCode}${number}`);
		} else {
			window.open(`https://api.whatsapp.com/send?phone=${countryCode}${number}`, '_blank');
		}
	}
	return (
		<div className="flex min-h-screen flex-col place-items-center justify-center gap-14">
			<h1 className="text-center text-4xl font-bold sm:w-1/2">
				Send WhatsApp Messages <br /> Hassle-Free
			</h1>
			<div className="flex flex-col gap-4 sm:flex-row">
				<div className="flex h-12 justify-center">
					<details onClick={toggleDropDown} ref={dropdownRef} className="dropdown z-10 mb-32 w-full sm:w-28">
						<summary ref={countrySlectorText} className="btn z-10 w-full sm:w-28">
							Select Country
						</summary>
						<input ref={searchTermRef} onKeyUp={(e) => hideLiElementsNotInSearch((e.target as HTMLInputElement).value)} placeholder="Search" className="input input-bordered mt-2 block h-8 w-32 rounded rounded-b-none p-2" />
						<ul ref={allCountriesRef} className="menu dropdown-content z-10 max-h-36 w-32 flex-row overflow-x-hidden overflow-y-scroll rounded rounded-t-none bg-base-100 shadow">
							<CountriesList codes={codes} updateCountryCode={updateCountryCode} maxEntries={maxCountriesEntries} />
						</ul>
						<div className="fixed left-0 right-0 top-0 -z-40 h-screen w-screen" onClick={closeDropDown}></div>
					</details>
				</div>
				<input ref={numberRef} type="text" className="input input-bordered w-full" placeholder="Enter phone number" />
				<button onClick={generateWhatsappLink} className="btn border-none bg-emerald-400 hover:bg-emerald-500 hover:text-white active:bg-emerald-500 active:text-white">
					Chat!
				</button>
			</div>
			<p className="w-10/12 text-center text-lg sm:w-1/3 sm:text-base">Effortlessly send WhatsApp messages from your computer to any WhatsApp number without the need to add them as contacts. Our simple tool generates API links for seamless communication.</p>
		</div>
	);
}

function CountriesList({ codes, updateCountryCode, maxEntries }: { codes: ICountryCodeItem[]; updateCountryCode: (countryCode: string, isoCode2: string) => void; maxEntries: number }) {
	return codes.slice(0, maxEntries).map((code) =>
		code.countryCodes.map((countryCode) => (
			<li key={countryCode}>
				<p onClick={() => updateCountryCode(countryCode, code.isoCode2)} className="w-28">
					{/* TODO: Fix countries with broken images */}
					<Image className={`inline w-4 ${code.isoCode2.toUpperCase()}`} src={`https://flagcdn.com/${code.isoCode2.toLowerCase()}.svg`} width={15} height={15} placeholder={'empty'} alt={``} />
					{countryCode}
				</p>
			</li>
		))
	);
}
