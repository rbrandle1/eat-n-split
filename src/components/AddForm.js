import { useState } from 'react';
import Button from './Button';

export const AddForm = ({ onAdd }) => {
	const [name, setName] = useState('');
	const [image, setImage] = useState('https://i.pravatar.cc/48');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!name || !image) return;

		const newItem = {
			id: crypto.randomUUID(),
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
			<Button disabled={!name || !image}>Add</Button>
		</form>
	);
};
export default AddForm;
