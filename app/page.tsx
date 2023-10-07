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
			if (element.innerText.includes(searchTerm)) {
				element.classList.remove('hidden');
			} else {
				element.classList.add('hidden');
			}
		}
	}

	function generateWhatsappLink() {
		let number = numberRef.current.value;
		console.log(`https://api.whatsapp.com/send?phone=${countryCode}${number}`);
		let completeNuber = countryCode + number;
		// Remove all spaces and - and + from number
		completeNuber = completeNuber.replace(/\s/g, '');
		completeNuber = completeNuber.replace(/-/g, '');
		completeNuber = completeNuber.replace(/\+/g, '');
		console.log(`https://api.whatsapp.com/send?phone=${completeNuber}`);
		//window.open(`https://api.whatsapp.com/send?phone=${countryCode}${number}`, '_blank');
		return `https://api.whatsapp.com/send?phone=${countryCode}${number}`;
	}
	return (
		<div className="flex flex-row gap-4">
			<div className="p-0 m-0 h-0">
				<details ref={dropdownRef} className="dropdown w-30 mb-32 z-10">
					<summary ref={countrySlectorText} className="btn w-28 z-10">
						Select Country
					</summary>
					<input ref={searchTermRef} onKeyUp={(e) => hideLiElementsNotInSearch((e.target as HTMLInputElement).value)} placeholder="Search" className="input block input-bordered rounded rounded-b-none p-2 mt-2 ml-3.5 h-8 w-20" />
					<ul ref={allCountriesRef} className="p-2 ml-3.5 shadow menu dropdown-content z-10 bg-base-100 rounded rounded-t-none w-20 h-fit max-h-56 overflow-scroll flex-row">
						{codes.map((code) => (
							<li onClick={() => updateCountryCode(code.countryCodes[0], code.isoCode2)} key={code.isoCode2}>
								<a className="p-3">
									<img className="inline" src={`https://countryflagicons.com/FLAT/16/${code.isoCode2}.png`} alt={``} />
									{code.isoCode2}
								</a>
							</li>
						))}
					</ul>
					<div className="w-screen h-screen fixed top-0 left-0 right-0 -z-40" onClick={closeDropDown}></div>
				</details>
			</div>
			<input ref={numberRef} type="text" className="input input-bordered w-full" placeholder="Enter phone number" />
			<button onClick={generateWhatsappLink} className="btn btn-accent">
				Chat!
			</button>
		</div>
	);
}
