import { useState, useRef, useEffect } from 'react';
import { Button } from './Button';

export const FormSplitBill = ({ selected, onSplit }) => {
	const [bill, setBill] = useState('');
	const [userPaid, setUserPaid] = useState('');
	const friendPaid = bill ? bill - userPaid : '';
	const [whoPaid, setWhoPaid] = useState('user');

	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [selected]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!bill || !userPaid) return;

		const balance = whoPaid === 'user' ? friendPaid : -userPaid;

		onSplit(balance);
	};

	return (
		<form className='form-split-bill' onSubmit={handleSubmit}>
			<h2>Split a bill with {selected.name}</h2>
			<label htmlFor='bill'>💵 Bill value</label>
			<input
				ref={inputRef}
				id='bill'
				type='number'
				placeholder='0.00'
				value={bill}
				onChange={(e) => setBill(Number(e.target.value) < 0 ? bill : Number(e.target.value))}
			/>
			<label htmlFor='userPaid'>🤷 Your expense</label>
			<input
				id='userPaid'
				type='number'
				value={userPaid}
				placeholder='0.00'
				onChange={(e) =>
					setUserPaid(Number(e.target.value) > bill || Number(e.target.value) < 0 ? userPaid : Number(e.target.value))
				}
			/>
			<label htmlFor='friendPaid'>🤷‍♀️ {selected.name}'s expense</label>
			<input id='friendPaid' type='number' value={friendPaid} disabled />
			<label htmlFor='whoPaid'>🤑 Who is paying?</label>
			<select id='whoPaid' value={whoPaid} onChange={(e) => setWhoPaid(e.target.value)}>
				<option value='user'>You</option>
				<option value='friend'>{selected.name}</option>
			</select>
			<Button disabled={!bill || !userPaid}>Split Bill</Button>
		</form>
	);
};
