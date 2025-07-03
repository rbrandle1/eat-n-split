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

	return (
		<>
			<ul>
				{items.map((friend) => (
					<FriendItem key={friend.id} data={friend} />
				))}
			</ul>
			<button className='button'>Add friend</button>
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
			<button className='button'>button</button>
		</li>
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
