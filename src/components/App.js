import { useState } from 'react';

const data = [
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

const getData = () => (typeof data !== 'undefined' ? data : []);

const initialFriends = getData();

const Button = ({ children, onClick }) => {
	return (
		<button className='button' onClick={onClick}>
			{children}
		</button>
	);
};

const FriendsList = ({ friends, selectedFriend, onSelect }) => {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend key={friend.id} friend={friend} selectedFriend={selectedFriend} onSelect={onSelect} />
			))}
		</ul>
	);
};

const Friend = ({ friend, selectedFriend, onSelect }) => {
	// WORK ON THIS
	const selected = selectedFriend?.id === friend.id;

	return (
		<li className={selected ? 'selected' : ''}>
			<img src={friend.image} alt={`${friend.name}'s Avatar`} />
			<h3>{friend.name}</h3>
			{friend.balance === 0 && <p>You and {friend.name} are even</p>}
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
			<Button onClick={() => onSelect(friend)}>{selected ? 'Close' : 'Select'}</Button>
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
			<label htmlFor='friendName'>👬 Friend name</label>
			<input id='friendName' type='text' value={name} onChange={(e) => setName(e.target.value)} />
			<label htmlFor='imageUrl'>🌄 Image URL</label>
			<input id='imageUrl' type='text' value={image} onChange={(e) => setImage(e.target.value)} />
			<Button>Add</Button>
		</form>
	);
};

const FormSplitBill = ({ selectedFriend, splitBill }) => {
	const [bill, setBill] = useState('');
	const [userPaid, setUserPaid] = useState('');
	const friendPaid = bill ? bill - userPaid : '';
	const [whoPaid, setWhoPaid] = useState('user');

	const handleSubmit = (e) => {
		e.preventDefault();

		const balance = whoPaid === 'user' ? friendPaid : -userPaid;

		splitBill(Number(balance));
	};

	return (
		<form className='form-split-bill' onSubmit={handleSubmit}>
			<h2>Split a bill with {selectedFriend?.name}</h2>
			<label htmlFor='bill'>💵 Bill value</label>
			<input id='bill' type='text' value={bill} onChange={(e) => setBill(Number(e.target.value))} />
			<label htmlFor='userPaid'>🤷 Your expense</label>
			<input id='userPaid' type='text' value={userPaid} onChange={(e) => setUserPaid(Number(e.target.value))} />
			<label htmlFor='friendPaid'>👬 {selectedFriend?.name}'s expense</label>
			<input id='friendPaid' type='text' value={friendPaid} disabled />
			<label htmlFor='whoPaid'>🤑 Who is paying the bill?</label>
			<select id='whoPaid' value={whoPaid} onChange={(e) => setWhoPaid(e.target.value)}>
				<option value='user'>You</option>
				<option value='friend'>{selectedFriend?.name}</option>
			</select>
			<Button>Split Bill</Button>
		</form>
	);
};

const App = () => {
	const [friends, setFriends] = useState(initialFriends);
	const [selectedFriend, setSelectedFriend] = useState(null);
	const [showAddFriend, setShowAddFriend] = useState(false);

	const handleToggle = () => {
		setShowAddFriend((show) => !show);
	};

	const handleAdd = (friend) => {
		setFriends((friends) => [...friends, friend]);
		setShowAddFriend(false);
	};

	const handleSelectedFriend = (friend) => {
		// WORK ON THIS
		setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
		setShowAddFriend(false);
	};

	const handleSplitBill = (number) => {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + number } : friend,
			),
		);
		setSelectedFriend(null);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList friends={friends} selectedFriend={selectedFriend} onSelect={handleSelectedFriend} />
				{showAddFriend && <FormAddFriend onAdd={handleAdd} />}
				<Button onClick={handleToggle}>{showAddFriend ? 'Close' : 'Add friend'}</Button>
			</div>
			{selectedFriend && <FormSplitBill selectedFriend={selectedFriend} splitBill={handleSplitBill} />}
		</div>
	);
};
export default App;
