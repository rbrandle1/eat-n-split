import { useState } from 'react';

const initialFriends = [
	{
		id: 118836,
		name: 'Clark',
		image: 'https://i.pravatar.cc/48?u=118836',
		balance: -7,
	},
	{
		id: 933372,
		name: 'Sarah',
		image: 'https://i.pravatar.cc/48?u=933372',
		balance: 20,
	},
	{
		id: 499476,
		name: 'Anthony',
		image: 'https://i.pravatar.cc/48?u=499476',
		balance: 0,
	},
];

const FriendsList = ({ items, onAddItem, onToggleBill, selected }) => {
	const [addOpen, setAddOpen] = useState(false);

	const handleToggleAdd = () => setAddOpen((is) => !is);

	const handleAddItem = (newItem) => {
		onAddItem([...items, newItem]);
		setAddOpen((is) => !is);
	};

	return (
		<>
			<ul>
				{items.map((friend) => (
					<FriendItem key={friend.id} data={friend} onToggle={onToggleBill} selected={selected} />
				))}
			</ul>
			{addOpen && <AddForm onAdd={handleAddItem} />}
			<button className='button' onClick={handleToggleAdd}>
				{addOpen ? 'Close' : 'Add friend'}
			</button>
		</>
	);
};

const FriendItem = ({ data, onToggle, selected }) => {
	const { id, name, image, balance } = data;

	const isSelected = id === selected;

	return (
		<li className={isSelected ? 'selected' : null}>
			<img src={image} alt='Friend avatar' />
			<h3>{name}</h3>
			<p className={balance < 0 ? 'red' : balance > 0 ? 'green' : null}>
				{balance === 0
					? `You and ${name} are even`
					: balance < 0
					? `You owe ${name} $${Math.abs(balance)}`
					: `${name} owes you $${balance}`}
			</p>
			<button className='button' onClick={() => onToggle(isSelected ? null : id)}>
				{isSelected ? 'Close' : 'Select'}
			</button>
		</li>
	);
};

const AddForm = ({ onAdd }) => {
	const [name, setName] = useState('');
	const [image, setImage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!name || !image) return;

		const newItem = {
			id: Date.now(),
			name,
			image,
			balance: 0,
		};

		onAdd(newItem);
		setName('');
		setImage('');
	};

	return (
		<form className='form-add-friend' onSubmit={handleSubmit}>
			<label htmlFor='friendName'>👯Friend name:</label>
			<input
				name='friendName'
				id='friendName'
				type='text'
				placeholder='Name...'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label htmlFor='imageUrl'>🌄Image URL:</label>
			<input
				name='imageUrl'
				id='imageUrl'
				type='text'
				placeholder='Name...'
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>
			<button className='button' disabled={!name || !image}>
				Add
			</button>
		</form>
	);
};

const BillForm = ({ items, selected, onSetBalance }) => {
	const [billAmt, setBillAmt] = useState('');
	const [expense1, setExpense1] = useState('');
	const [who, setWho] = useState('you');

	const getSelectedItem = (id) => items.find((el) => el.id === id);
	const selectedItem = getSelectedItem(selected);

	const expenseCalc = billAmt - expense1;

	const handleSubmit = (e) => {
		e.preventDefault();

		onSetBalance(who !== 'you' ? `-${expenseCalc}` : expenseCalc);
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
			<input name='expense2' id='expense2' type='number' value={expenseCalc} disabled />
			<label htmlFor='who'>🤑Who is paying the bill?:</label>
			<select name='who' id='who' value={who} onChange={(e) => setWho(e.target.value)}>
				<option value='you'>You</option>
				<option value={selectedItem.name}>{selectedItem.name}</option>
			</select>
			<button className='button'>Split bill</button>
		</form>
	);
};

const App = () => {
	// ? Do I really need to pass the entire items object down into BillForm? Or just the .name and .id?
	const [items, setItems] = useState(initialFriends);
	const [selected, setSelected] = useState(null);

	const handleBalance = (newBalance) => {
		setItems(items.map((el) => (el.id === selected ? { ...el, balance: newBalance } : el)));
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList onToggleBill={setSelected} selected={selected} items={items} onAddItem={setItems} />
			</div>
			{selected && <BillForm items={items} selected={selected} onSetBalance={handleBalance} />}
		</div>
	);
};
export default App;
