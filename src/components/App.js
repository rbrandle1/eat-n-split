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
	return (
		<ul>
			<Friend />
		</ul>
	);
};

const Friend = () => {
	return (
		// add ".selected" class to li
		// add "red/green" classes to p
		<li>
			<img src='' alt='' />
			<h3>Name</h3>
			<p>balance owed</p>
			<Button>Select</Button>
		</li>
	);
};

// const FormAddFriend = () => {
// 	// TIP: for random image generation, set a default useState to: 'https://i.pravatar.cc/48'
// 	// Create a random id variable like: const id = crypto.randomUUID();
// 	// Then, when constructing the new friend object, you can piece the two together like" image: `${image}?=${id}`

// 	return (
// 		<form className='form-add-friend'>
// 			<label for=''></label>
// 			<input type='text' />
// 			<Button>Add</Button>
// 		</form>
// 	);
// };

// const FormSplitBill = () => {
// 	return (
// 	<form className='form-split-bill'>
// 	<h2>Title</h2>
// 	<label for=""></label>
// 	<input type="text" />
// 	<Button>Split Bill</Button>
// 	</form>
// 	);
// };

const App = () => {
	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList />
				{/* FormAddFriend here */}
				{/* Button here */}
			</div>
			{/* FormSplitBill here */}
		</div>
	);
};
export default App;
