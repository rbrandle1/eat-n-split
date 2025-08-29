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

const Button = () => {
	return <button className='button'>button</button>;
};

const FriendsList = () => {
	return <ul>{/* Friend here */}</ul>;
};

const Friend = () => {
	return (
		// each li has img, h3 (name), p (balance owed), Button
		// add ".selected" class to li
		// add "red/green" classes to p
		<li>{/* Friend here */}</li>
	);
};

const FormAddFriend = () => {
	return <form className='form-add-friend'>{/* labels, inputs, Button */}</form>;
};

const FormSplitBill = () => {
	return <form className='form-split-bill'>{/* h2(Title), labels, inputs, selects, Button */}</form>;
};

const App = () => {
	return (
		<div className='app'>
			<div className='sidebar'>
				{/* FriendsList ul here, Friend li subcomponent */}
				{/* FormAddFriend here */}
				{/* Button here */}
			</div>
			{/* FormSplitBill here */}
		</div>
	);
};
export default App;
