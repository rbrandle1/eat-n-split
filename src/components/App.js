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

const Button = ({ children, onClick }) => {
	return (
		<button className='button' onClick={onClick}>
			{children}
		</button>
	);
};

const FriendsList = ({ items }) => {
	return (
		<ul>
			{items.map((item) => (
				<Friend key={item.id} item={item} />
			))}
		</ul>
	);
};

const Friend = ({ item }) => {
	const { name, image, balance } = item;

	return (
		// add ".selected" class to li
		// add "red/green" classes to p
		<li>
			<img src={image} alt={`${name}'s avatar`} />
			<h3>{name}</h3>
			<p>balance {balance}</p>
			<Button>Select</Button>
		</li>
	);
};

const FormAddFriend = ({ onAdd }) => {
	const [name, setName] = useState('');
	const [image, setImage] = useState('https://i.pravatar.cc/48');
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen((is) => !is);
	};

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
		setIsOpen(false);
	};

	return (
		<>
			{isOpen && (
				<form className='form-add-friend' onSubmit={handleSubmit}>
					<label htmlFor='name'>🤷‍♀️ Friend name</label>
					<input
						id='name'
						type='text'
						placeholder='Add name...'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<label htmlFor='image'>🌄 Image URL</label>
					<input
						id='image'
						type='text'
						placeholder='Add url...'
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
					<Button>Add</Button>
				</form>
			)}
			<Button onClick={handleToggle}>{isOpen ? 'Close' : 'Add friend'}</Button>
		</>
	);
};

const FormSplitBill = () => {
	return <form className='form-split-bill'>form here{/* h2(Title), labels, inputs, selects, Button */}</form>;
};

const App = () => {
	const [items, setItems] = useState(initialFriends);

	const addFriend = (newItem) => {
		setItems((items) => [...items, newItem]);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList items={items} />
				<FormAddFriend onAdd={addFriend} />
			</div>
			<FormSplitBill />
		</div>
	);
};
export default App;
