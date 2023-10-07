'use client';
import codes from 'country-calling-code';
import React, { useState, useRef } from 'react';
export default function Home() {
	const numberRef = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;
	const dropdownRef = useRef(null) as unknown as React.MutableRefObject<HTMLDetailsElement>;
	const allCountriesRef = useRef(null) as unknown as React.MutableRefObject<HTMLUListElement>;
	const countrySlectorText = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>;
	const searchTermRef = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;
	const [countryCode, setCountryCode] = useState('');

	function updateCountryCode(countryCode: string, isoCode2: string) {
		closeDropDown();

		let countryCodeAndImageHTMLCode = `<img src="https://countryflagicons.com/FLAT/16/${isoCode2}.png" alt=""/> ${countryCode}`;
		countrySlectorText.current.innerHTML = countryCodeAndImageHTMLCode;
		setCountryCode(countryCode);
	}

	function closeDropDown() {
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
		<div className="flex flex-col gap-4 sm:flex-row">
			<div className="h-12">
				<details ref={dropdownRef} className="dropdown z-10 mb-32 w-28">
					<summary ref={countrySlectorText} className="btn z-10 w-28">
						Select Country
					</summary>
					<input ref={searchTermRef} onKeyUp={(e) => hideLiElementsNotInSearch((e.target as HTMLInputElement).value)} placeholder="Search" className="input input-bordered mt-2 block h-8 w-32 rounded rounded-b-none p-2" />
					<ul ref={allCountriesRef} className="menu dropdown-content z-10 max-h-36 w-32 flex-row overflow-x-hidden overflow-y-scroll rounded rounded-t-none bg-base-100 shadow">
						{codes.map((code) =>
							code.countryCodes.map((countryCode) => (
								<li onClick={() => updateCountryCode(countryCode, code.isoCode2)} key={countryCode}>
									<a className="w-28">
										<img className="inline" src={`https://countryflagicons.com/FLAT/16/${code.isoCode2}.png`} alt={``} />
										{countryCode}
									</a>
								</li>
							))
						)}
					</ul>
					<div className="fixed left-0 right-0 top-0 -z-40 h-screen w-screen" onClick={closeDropDown}></div>
				</details>
			</div>
			<input ref={numberRef} type="text" className="input input-bordered w-full" placeholder="Enter phone number" />
			<button onClick={generateWhatsappLink} className="btn border-none bg-emerald-400 hover:bg-emerald-500 hover:text-white active:bg-emerald-500 active:text-white">
				Chat!
			</button>
		</div>
	);
}
