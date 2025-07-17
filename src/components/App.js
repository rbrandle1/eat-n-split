import { useState } from 'react';
import { FriendsList } from './FriendsList';
import { BillForm } from './BillForm';

// ! Need to make a specific handler function to setSelected instead of just tapping right into it. Video 100 @6min. This somehow gets around needing to write that "get selected" function I wrote by passing the entire object down into the billForm as well as deeper into the item.

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

const App = () => {
	// ? Do I really need to pass the entire items object down into BillForm? Or just the .name and .id?
	//! no! see note above
	const [items, setItems] = useState(initialFriends);
	const [selected, setSelected] = useState(null);

	const handleBalance = (newBalance) => {
		setItems(items.map((el) => (el.id === selected ? { ...el, balance: newBalance } : el)));
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList onToggleBill={setSelected} selected={selected} items={items} onAddItem={setItems} />
			</div>
			{selected && (
				<BillForm items={items} selected={selected} onSetBalance={handleBalance} onToggleBill={setSelected} />
			)}
		</div>
	);
};
export default App;
