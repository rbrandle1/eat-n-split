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

const Button = ({ children, onClick, disabled }) => {
	return (
		<button className='button' onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

const FriendsList = ({ friends, selected, onSelect }) => {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend key={friend.id} friend={friend} selected={selected} onSelect={onSelect} />
			))}
		</ul>
	);
};

const Friend = ({ friend, selected, onSelect }) => {
	const isSelected = friend.id === selected?.id;

	return (
		<li className={isSelected ? 'selected' : ''}>
			<img src={friend.image} alt='' />
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
		setImage(IMG_BASE);
	};

	return (
		<form className='form-add-friend' onSubmit={handleSubmit}>
			<label htmlFor='name'>🤷‍♀️ Friend name</label>
			<input id='name' type='text' placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} />
			<label htmlFor='image'>🌄 Image URL</label>
			<input id='image' type='text' placeholder='URL...' value={image} onChange={(e) => setImage(e.target.value)} />
			<Button disabled={!name || !image}>Add</Button>
		</form>
	);
};

const FormSplitBill = ({ selected, onSplitBill }) => {
	const [bill, setBill] = useState('');
	const [userPaid, setUserPaid] = useState('');
	const friendPaid = bill ? bill - userPaid : '';
	const [whoPaid, setWhoPaid] = useState('user');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!bill || !userPaid) return;

		const balance = whoPaid === 'user' ? friendPaid : -userPaid;

		onSplitBill(balance);
	};

	return (
		<form className='form-split-bill' onSubmit={handleSubmit}>
			<h2>Split a bill with {selected.name}</h2>
			<label htmlFor='bill'>💵 Bill value</label>
			<input
				id='bill'
				type='number'
				value={bill}
				onChange={(e) => setBill(Number(e.target.value) <= 0 ? bill : Number(e.target.value))}
			/>
			<label htmlFor='userPaid'>🤷‍♀️ Your expense</label>
			<input
				id='userPaid'
				type='number'
				value={userPaid}
				onChange={(e) =>
					setUserPaid(Number(e.target.value) > bill || Number(e.target.value) < 0 ? userPaid : Number(e.target.value))
				}
			/>
			<label htmlFor='friendPaid'>🤷 {selected.name}'s expense</label>
			<input id='friendPaid' type='text' value={friendPaid} disabled />
			<label htmlFor='whoPaid'>🤑 Who paid?</label>
			<select id='whoPaid' value={whoPaid} onChange={(e) => setWhoPaid(e.target.value)}>
				<option value='user'>You</option>
				<option value='friend'>{selected.name}</option>
			</select>
			<Button disabled={!bill || !userPaid}>Split Bill</Button>
		</form>
	);
};

const App = () => {
	const [friends, setFriends] = useState(initialFriends);
	const [selectedFriend, setSelectedFriend] = useState(null);
	const [showAddFriends, setShowAddFriends] = useState(false);

	const handleToggle = () => {
		setShowAddFriends((is) => !is);
	};

	const handleAddFriend = (friend) => {
		setFriends((friends) => [...friends, friend]);
		setShowAddFriends(false);
	};

	const handleSelect = (friend) => {
		setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
		setShowAddFriends(false);
	};

	const handleSplitBill = (balance) => {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + balance } : friend,
			),
		);
		setSelectedFriend(false);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList friends={friends} selected={selectedFriend} onSelect={handleSelect} />
				{showAddFriends && <FormAddFriend onAdd={handleAddFriend} />}
				<Button onClick={handleToggle}>{showAddFriends ? 'Close' : 'Add friend'}</Button>
			</div>
			{selectedFriend && <FormSplitBill selected={selectedFriend} onSplitBill={handleSplitBill} />}
		</div>
	);
};
export default App;
