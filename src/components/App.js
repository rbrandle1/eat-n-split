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

const Button = ({ children }) => {
	return <button className='button'>{children}</button>;
};

const FriendsList = ({ friends }) => {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend key={friend.id} friend={friend} />
			))}
		</ul>
	);
};

const Friend = ({ friend }) => {
	return (
		// add ".selected" class to li
		<li>
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
			<Button>Select</Button>
		</li>
	);
};

// const FormAddFriend = () => {
// 	// TIP: for random image generation, set a default useState to: 'https://i.pravatar.cc/48'
// 	// Create a random id variable like: const id = crypto.randomUUID();
// 	// Then, when constructing the new friend object, you can piece the two together like" image: `${image}?=${id}`

// 	return <form className='form-add-friend'>{/* labels, inputs, Button */}</form>;
// };

// const FormSplitBill = () => {
// 	return <form className='form-split-bill'>{/* h2(Title), labels, inputs, selects, Button */}</form>;
// };

const App = () => {
	const [friends, setFriends] = useState(initialFriends);

	const handleAddFriend = () => {
		console.log('added');
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList friends={friends} onAddFriend={handleAddFriend} />
				{/* FormAddFriend here */}
				{/* Button here */}
			</div>
			{/* FormSplitBill here */}
		</div>
	);
};
export default App;
