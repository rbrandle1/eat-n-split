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

const Button = ({ children }) => {
	return <button className='button'>{children}</button>;
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
	// TIP: for random image generation, set a default useState to: 'https://i.pravatar.cc/48'
	// Create a random id variable like: const id = crypto.randomUUID();
	// Then, when constructing the new friend object, you can piece the two together like" image: `${image}?=${id}`
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
		<>
			<form className='form-add-friend' onSubmit={handleSubmit}>
				<label htmlFor='name'>🤷‍♀️ Friend name</label>
				<input id='name' type='text' placeholder='Add name...' value={name} onChange={(e) => setName(e.target.value)} />
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
			<Button>Add friend</Button>
		</>
	);
};

// const FormSplitBill = () => {
// 	return <form className='form-split-bill'>{/* h2(Title), labels, inputs, selects, Button */}</form>;
// };

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
				{/* Button here */}
			</div>
			FormBillSplit
			{/* FormSplitBill here */}
		</div>
	);
};
export default App;
