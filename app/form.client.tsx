'use client';
import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import codes, { ICountryCodeItem } from 'country-calling-code';
import Image from 'next/image';

interface activeCountryProps {
	activeCountry: {
		countryIsoCode2: string;
		countryCode: string | undefined;
	};
	setActiveCountry: Dispatch<SetStateAction<activeCountryProps['activeCountry']>>;
}

export default function ClientForm({ initCountry }: { initCountry: string }) {
	const numberRef = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;
	const dropdownRef = useRef(null) as unknown as React.MutableRefObject<HTMLDetailsElement>;
	const allCountriesRef = useRef(null) as unknown as React.MutableRefObject<HTMLUListElement>;
	const searchTermRef = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;
	const [maxCountriesEntries, setMaxCountriesEntries] = useState(15);
	const [activeCountry, setActiveCountry] = useState({ countryIsoCode2: initCountry, countryCode: codes.find((code) => code.isoCode2 === initCountry)?.countryCodes[0] });

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

	function generateWhatsappLink() {
		let number = numberRef.current.value;
		let completeNumber = activeCountry.countryCode + number;
		// Remove all spaces and - and + from number
		completeNumber = completeNumber.replace(/\s/g, '');
		completeNumber = completeNumber.replace(/-/g, '');
		completeNumber = completeNumber.replace(/\+/g, '');
		if (process.env.NODE_ENV === 'development') {
			console.log(`https://api.whatsapp.com/send?phone=${completeNumber}`);
		} else {
			window.open(`https://api.whatsapp.com/send?phone=${completeNumber}`, '_blank');
		}
	}

	return (
		<>
			<div className="flex h-12 justify-center">
				<details onClick={toggleDropDown} ref={dropdownRef} className="dropdown z-10 mb-32 w-full sm:w-28">
					<summary className="btn z-10 w-full sm:w-28">
						<SelectedCountryDisplay activeCountry={activeCountry} />
					</summary>
					<input ref={searchTermRef} onClick={(e) => e.stopPropagation()} onKeyUp={(e) => hideLiElementsNotInSearch((e.target as HTMLInputElement).value)} placeholder="Search" className="input input-bordered ml-12 mt-2 block h-10 w-32 rounded rounded-b-none p-2 sm:ml-0" />
					<ul ref={allCountriesRef} className="sm:max-h-auto menu dropdown-content z-10 ml-12 max-h-52 w-32 flex-row overflow-x-hidden overflow-y-scroll rounded rounded-t-none bg-base-100 pt-0 shadow sm:ml-0">
						<CountriesList codes={codes} setActiveCountry={setActiveCountry} maxEntries={maxCountriesEntries} />
					</ul>
					<div className="fixed left-0 right-0 top-0 -z-40 h-screen w-screen" onClick={closeDropDown}></div>
				</details>
			</div>
			<input ref={numberRef} type="text" className="input input-bordered w-full" placeholder="Enter phone number" />
			<button onClick={generateWhatsappLink} className="btn border-none bg-emerald-400 hover:bg-emerald-500 hover:text-white active:bg-emerald-500 active:text-white">
				Chat!
			</button>
		</>
	);
}

function CountriesList({ codes, setActiveCountry, maxEntries }: { codes: ICountryCodeItem[]; setActiveCountry: activeCountryProps['setActiveCountry']; maxEntries: number }) {
	return codes.slice(0, maxEntries).map((code) =>
		code.countryCodes.map((countryCode) => (
			<li className="border-b first:border-t" key={countryCode}>
				<p onClick={() => setActiveCountry({ countryIsoCode2: code.isoCode2, countryCode })} className="w-28 rounded-none p-3">
					{/* TODO: Fix countries with broken images */}
					<Image className={`inline w-4 ${code.isoCode2.toUpperCase()}`} src={`https://flagcdn.com/${code.isoCode2.toLowerCase()}.svg`} width={15} height={15} placeholder={'empty'} alt={``} />
					{countryCode}
				</p>
			</li>
		))
	);
}

function SelectedCountryDisplay({ activeCountry }: { activeCountry: activeCountryProps['activeCountry'] }) {
	return (
		<>
			<Image className="inline w-4" src={`https://flagcdn.com/${activeCountry.countryIsoCode2.toLowerCase()}.svg`} width={15} height={15} placeholder={'empty'} alt="" /> {activeCountry.countryCode}
		</>
	);
}
