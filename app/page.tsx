'use client';
import codes from 'country-calling-code';
import { useState, useRef } from 'react';
export default function Home() {
	const numberRef = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;
	const [countryCode, setCountryCode] = useState('');
	const [displayDropdown, setDisplayDropdown] = useState('hidden');
	function toggleDropdown() {
		if (displayDropdown === 'hidden') {
			setDisplayDropdown('');
		} else {
			setDisplayDropdown('hidden');
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
		<>
			<p onClick={toggleDropdown}>Dropdown</p>
			<ol className={`h-64 ${displayDropdown} w-fit overflow-scroll bg-gray-400 rounded-md p-2`}>
				{codes.map((code) => (
					<li onClick={() => setCountryCode(code.countryCodes[0])} key={code.country} className="border-y border-gray-700">
						<img className="inline" src={`https://countryflagicons.com/FLAT/16/${code.isoCode2}.png`} alt={``} />
						&nbsp;{code.isoCode2}
					</li>
				))}
			</ol>
			<input ref={numberRef} className="border bg-gray-500 rounded" type="text" placeholder="Enter phone number" />
			<button onClick={generateWhatsappLink} className="border bg-gray-500 rounded">
				Chat!
			</button>
		</>
	);
}
