'use client';
import codes from 'country-calling-code';
import React, { useState, useRef } from 'react';
export default function Home() {
	const numberRef = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;
	const dropdownRef = useRef(null) as unknown as React.MutableRefObject<HTMLDetailsElement>;
	const [countryCode, setCountryCode] = useState('');

	function closeDropDown() {
		dropdownRef.current.removeAttribute('open');
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
					<summary className="btn w-28 z-10">FLAG PK +92</summary>
					<ul className="p-2 mt-2 ml-3.5 shadow menu dropdown-content z-10 bg-base-100 rounded w-20 h-56 overflow-scroll flex-row">
						{codes.map((code) => (
							<li onClick={() => setCountryCode(code.countryCodes[0])} key={code.country}>
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
			<input ref={numberRef} type="text" className="input input-bordered w-full max-w-xs" placeholder="Enter phone number" />
			<button onClick={generateWhatsappLink} className="btn btn-accent">
				Chat!
			</button>
		</div>
	);
}
