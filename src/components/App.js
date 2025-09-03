import { useState } from 'react';

// todo: hook up form to pass in selected
// todo: hook up form controls
// todo: hook up split bill balance

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
	// need some way to optional chain to handle null
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
			<Button onClick={() => onSelect(friend)}>Select</Button>
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

// const FormSplitBill = () => {
// 	return <form className='form-split-bill'>{/* h2(Title), labels, inputs, selects, Button */}</form>;
// };

const App = () => {
	const [friends, setFriends] = useState(initialFriends);
	const [selectedFriend, setSelectedFriend] = useState(null);
	const [showAddFriend, setShowAddFriend] = useState(false);

	const handleToggle = () => {
		setShowAddFriend((show) => !show);
	};

	const handleAdd = (newFriend) => {
		setFriends((friends) => [...friends, newFriend]);
		setShowAddFriend(false);
	};

	const handleSelectedFriend = (friend) => {
		setSelectedFriend((cur) => (cur?.friend === selectedFriend ? null : friend));
		console.log(selectedFriend);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList friends={friends} selectedFriend={selectedFriend} onSelect={handleSelectedFriend} />
				{showAddFriend && <FormAddFriend onAdd={handleAdd} />}
				<Button onClick={handleToggle}>{showAddFriend ? 'Close' : 'Add friend'}</Button>
			</div>
			{/* FormSplitBill here */}
		</div>
	);
};
export default App;
