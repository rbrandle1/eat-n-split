import { useState } from 'react';

/**
 * ! Work on the following
 * When multiple properties in the data object need to know if the data is "selected" or not, think of creating a full selected version of the object, not just searching for an applicable id. So you'll have the usual mapped data object, and then you can compare with the 'selected' object.
 * Try to understand the mathematics portion of calculating these tips... These values are not just derived from a single 'difference'. You need to know the bill, paidByUser, paidByFriend, and whoIsPaying.
 * Keep the "Add Friend" button out of the form. It should be used as a simple toggle to open and close the form, not be included as in 'add' form component.
 * Make sure inputs are the correct type, not all 'text'.
 */

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

const Button = ({ children, onClick }) => {
	return (
		<button className='button' onClick={onClick}>
			{children}
		</button>
	);
};

const FriendsList = ({ items, selected, onSelect }) => {
	return (
		<ul>
			{items.map((item) => (
				<Friend key={item.id} item={item} selected={selected} onSelect={onSelect} />
			))}
		</ul>
	);
};

const Friend = ({ item, selected, onSelect }) => {
	const { id, name, image, balance } = item;

	const isSelected = selected?.id === id;

	return (
		<li className={isSelected ? 'selected' : ''}>
			<img src={image} alt={`${name}'s avatar`} />
			<h3>{name}</h3>
			{balance === 0 ? (
				<p>You and {name} are even</p>
			) : balance < 0 ? (
				<p className='red'>
					You owe {name} ${Math.abs(balance)}
				</p>
			) : (
				<p className='green'>
					{name} owes you ${balance}
				</p>
			)}
			<Button onClick={() => onSelect(item)}>{isSelected ? 'Close' : 'Select'}</Button>
		</li>
	);
};

const FormAddFriend = ({ onAdd }) => {
	const [name, setName] = useState('');
	const [image, setImage] = useState('https://i.pravatar.cc/48');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!name || !image) return;

		const id = crypto.randomUUID();

		const newFriend = {
			id,
			name,
			image: `${image}?=${id}`,
			balance: 0,
		};

		onAdd(newFriend);

		setName('');
		setImage('https://i.pravatar.cc/48');
	};

	return (
		<form className='form-add-friend' onSubmit={handleSubmit}>
			<label htmlFor='name'>🤷‍♀️ Friend name</label>
			<input id='name' type='text' placeholder='Add name...' value={name} onChange={(e) => setName(e.target.value)} />
			<label htmlFor='image'>🌄 Image URL</label>
			<input id='image' type='text' placeholder='Add url...' value={image} onChange={(e) => setImage(e.target.value)} />
			<Button>Add</Button>
		</form>
	);
};

const FormSplitBill = ({ setBalance, selected }) => {
	const [bill, setBill] = useState('');
	const [paidByUser, setPaidByUser] = useState('');
	const paidByFriend = bill ? bill - paidByUser : '';
	const [who, setWho] = useState('user');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!bill || !paidByUser) return;
		setBalance(who === 'user' ? paidByFriend : -paidByUser);
	};

	return (
		<form className='form-split-bill' onSubmit={handleSubmit}>
			<h2>Split a Bill with {selected.name}</h2>
			<label htmlFor='billValue'>💰 Bill value</label>
			<input
				id='billValue'
				type='number'
				placeholder='Total...'
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>
			<label htmlFor='expense1'>🧍‍♂️ Your expense</label>
			<input
				id='expense1'
				type='number'
				placeholder='Expense...'
				value={paidByUser}
				// I don't understand this part... does this simply handle the 0?
				onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))}
			/>
			<label htmlFor='expense2'>👬 {selected.name}'s expense</label>
			<input id='expense2' type='number' value={paidByFriend} disabled />
			<label htmlFor='payee'>🤮 Who is paying the bill?</label>
			<select id='payee' value={who} onChange={(e) => setWho(e.target.value)}>
				<option value='user'>You</option>
				<option value='friend'>{selected.name}</option>
			</select>
			<Button>Split bill</Button>
		</form>
	);
};

const App = () => {
	const [items, setItems] = useState(initialFriends);
	const [selected, setSelected] = useState(null);
	const [showAdd, setShowAdd] = useState(false);

	const handleToggle = () => {
		setShowAdd((is) => !is);
	};

	const handleAdd = (newItem) => {
		setItems((items) => [...items, newItem]);
		setShowAdd(false);
	};

	const handleSelect = (obj) => {
		setSelected((cur) => (cur?.id === obj.id ? null : obj));
		setShowAdd(false);
	};

	const handleBalance = (difference) => {
		setItems((items) => items.map((el) => (el.id === selected.id ? { ...el, balance: el.balance + difference } : el)));
		setSelected(null);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList items={items} selected={selected} onSelect={handleSelect} />
				{showAdd && <FormAddFriend onAdd={handleAdd} />}
				<Button onClick={handleToggle}>{showAdd ? 'Close' : 'Add friend'}</Button>
			</div>
			{selected && <FormSplitBill selected={selected} setBalance={handleBalance} />}
		</div>
	);
};
export default App;
