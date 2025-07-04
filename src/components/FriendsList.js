import { useState } from 'react';
import AddForm from './AddForm';
import FriendItem from './FriendItem';
import Button from './Button';

export const FriendsList = ({ items, onAddItem, onToggleBill, selected }) => {
	const [addOpen, setAddOpen] = useState(false);

	const handleToggleAdd = () => setAddOpen((is) => !is);

	const handleAddItem = (newItem) => {
		onAddItem([...items, newItem]);
		setAddOpen((is) => !is);
	};

	return (
		<>
			<ul>
				{items.map((friend) => (
					<FriendItem key={friend.id} data={friend} onToggle={onToggleBill} selected={selected} />
				))}
			</ul>
			{addOpen && <AddForm onAdd={handleAddItem} />}
			<Button onClick={handleToggleAdd}>{addOpen ? 'Close' : 'Add friend'}</Button>
		</>
	);
};
export default FriendsList;
