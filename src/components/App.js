import { useState } from 'react';
import { Button } from './Button';
import { FriendsList } from './FriendsList';
import { FormAddFriend } from './FormAddFriend';
import { FormSplitBill } from './FormSplitBill';
import { data } from '../data';

const initialFriends = typeof data !== 'undefined' ? data : [];

const App = () => {
	const [friends, setFriends] = useState(initialFriends);
	const [selectedFriend, setSelectedFriend] = useState(null);
	const [showAdd, setShowAdd] = useState(false);

	const handleToggle = () => {
		setShowAdd((is) => !is);
		setSelectedFriend(null);
	};

	const handleAdd = (friend) => {
		setFriends((friends) => [...friends, friend]);
		setShowAdd(false);
	};

	const handleSelect = (friend) => {
		setSelectedFriend((cur) => (cur?.id !== friend.id ? friend : null));
		setShowAdd(false);
	};

	const handleSplitBill = (balance) => {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id ? { ...friend, balance: selectedFriend.balance + balance } : friend,
			),
		);
		setSelectedFriend(null);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				{initialFriends.length > 0 ? (
					<FriendsList friends={friends} onSelect={handleSelect} selected={selectedFriend} />
				) : (
					'Add your first friend!'
				)}
				{showAdd && <FormAddFriend onAdd={handleAdd} />}
				<Button onClick={handleToggle}>{showAdd ? 'Close' : `\u002B Add Friend`}</Button>
			</div>
			{selectedFriend && <FormSplitBill selected={selectedFriend} onSplit={handleSplitBill} />}
		</div>
	);
};
export default App;
