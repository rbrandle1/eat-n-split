import { useState } from 'react';
import Button from './Button';

//! Can def clean this up a bit. See video 100.

export const BillForm = ({ items, selected, onSetBalance, onToggleBill }) => {
	const [billAmt, setBillAmt] = useState('');
	const [expense1, setExpense1] = useState('');
	const [who, setWho] = useState('you');

	const expense2 = billAmt - expense1;

	const getSelectedItem = (id) => items.find((el) => el.id === id);

	const selectedItem = getSelectedItem(selected);

	const handleSubmit = (e) => {
		e.preventDefault();

		onSetBalance(who !== 'you' ? `-${expense1}` : expense2);
		setBillAmt('');
		setExpense1('');
		setWho('you');
		onToggleBill(null);
	};

	return (
		<form className='form-split-bill' onSubmit={handleSubmit}>
			<h2>Split a bill with {selectedItem.name}</h2>
			<label htmlFor='bill'>💰Bill value:</label>
			<input name='bill' id='bill' type='number' value={billAmt} onChange={(e) => setBillAmt(Number(e.target.value))} />
			<label htmlFor='expense1'>🧍‍♀️Your expense:</label>
			<input
				name='expense1'
				id='expense1'
				type='number'
				value={expense1}
				onChange={(e) => setExpense1(Number(e.target.value))}
			/>
			<label htmlFor='expense2'>👯{selectedItem.name}'s expense:</label>
			<input name='expense2' id='expense2' type='number' value={expense2} disabled />
			<label htmlFor='who'>🤑Who is paying the bill?:</label>
			<select name='who' id='who' value={who} onChange={(e) => setWho(e.target.value)}>
				<option value='you'>You</option>
				<option value={selectedItem.name}>{selectedItem.name}</option>
			</select>
			<Button disabled={!billAmt || !expense1}>Split bill</Button>
		</form>
	);
};
export default BillForm;
