import { useState } from 'react';

/**
 * GO ALL OUT
 * ! add data fallback / add friends
 * ! add placeholders
 * ! add disabled states to buttons
 * ! ensure accessibility best practices
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

const FriendsList = ({ friends, onSelect, selected }) => {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend key={friend.id} friend={friend} onSelect={onSelect} selected={selected} />
			))}
		</ul>
	);
};

const Friend = ({ friend, onSelect, selected }) => {
	const isSelected = selected?.id === friend.id;

	return (
		<li className={isSelected ? 'selected' : ''}>
			<img src={friend.image} alt={`${friend.name}'s avatar`} />
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className='red'>
					You owe {friend.name} ${Math.abs(friend.balance)}
				</p>
			)}
			{friend.balance > 0 && (
				<p className='green'>
					{friend.name} owes you ${friend.balance}
				</p>
			)}
			{friend.balance === 0 && <p>You and {friend.name} are even</p>}
			<Button onClick={() => onSelect(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
		</li>
	);
};

const FormAddFriend = ({ onAdd }) => {
	const IMG_BASE = 'https://i.pravatar.cc/48';

	const [name, setName] = useState('');
	const [image, setImage] = useState(IMG_BASE);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!name || !image) return;

		const id = crypto.randomUUID();

		const newFriend = {
			id,
			name,
			image: `${IMG_BASE}?=${id}`,
			balance: 0,
		};

		onAdd(newFriend);
		setName('');
		setImage('');
	};

	return (
		<form className='form-add-friend' onSubmit={handleSubmit}>
			<label htmlFor='name'>🤷‍♀️ Friend name</label>
			<input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
			<label htmlFor='img'>🌄 Image URL</label>
			<input id='img' type='text' value={image} onChange={(e) => setImage(e.target.value)} />
			<Button>Add</Button>
		</form>
	);
};

const FormSplitBill = ({ selected, onSplit }) => {
	const [bill, setBill] = useState('');
	const [userPaid, setUserPaid] = useState('');
	const friendPaid = bill ? bill - userPaid : '';
	const [whoPaid, setWhoPaid] = useState('user');

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
			<input id='bill' type='number' value={bill} onChange={(e) => setBill(Number(e.target.value))} />
			<label htmlFor='userPaid'>🤷 Your expense</label>
			<input
				id='userPaid'
				type='number'
				value={userPaid}
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
			<Button>Split Bill</Button>
		</form>
	);
};

const App = () => {
	const [friends, setFriends] = useState(initialFriends);
	const [selectedFriend, setSelectedFriend] = useState(null);
	const [showAdd, setShowAdd] = useState(false);

	const handleToggle = () => {
		setShowAdd((is) => !is);
	};

	const handleAdd = (friend) => {
		setFriends((friends) => [...friends, friend]);
		setShowAdd(false);
	};

	const handleSelect = (friend) => {
		setSelectedFriend((cur) => (cur?.id !== friend.id ? friend : null));
		setShowAdd(false);
	};

	const handleSplitBill = (balance) => {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id ? { ...friend, balance: selectedFriend.balance + balance } : friend,
			),
		);
		setSelectedFriend(null);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList friends={friends} onSelect={handleSelect} selected={selectedFriend} />
				{showAdd && <FormAddFriend onAdd={handleAdd} />}
				<Button onClick={handleToggle}>{showAdd ? 'Close' : 'Add friend'}</Button>
			</div>
			{selectedFriend && <FormSplitBill selected={selectedFriend} onSplit={handleSplitBill} />}
		</div>
	);
};
export default App;
