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

const FriendsList = () => {
	const [items, setItems] = useState(initialFriends);
	const [addOpen, setAddOpen] = useState(false);

	const handleToggleAdd = () => setAddOpen((is) => !is);

	const handleAddItem = (newItem) => setItems([...items, newItem]);

	return (
		<>
			<ul>
				{items.map((friend) => (
					<FriendItem key={friend.id} data={friend} />
				))}
			</ul>
			{addOpen && <AddForm onAdd={handleAddItem} />}
			<button className='button' onClick={handleToggleAdd}>
				{addOpen ? 'Close' : 'Add friend'}
			</button>
		</>
	);
};

const FriendItem = ({ data }) => {
	const { id, name, image, balance } = data;
	return (
		<li>
			<img src={image} alt='Friend avatar' />
			<h3>{name}</h3>
			<p>Balance message is ${balance}</p>
			<button className='button'>Select</button>
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

const App = () => {
	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList />
			</div>
		</div>
	);
};
export default App;
