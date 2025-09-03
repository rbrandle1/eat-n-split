import { useState, useRef, useEffect } from 'react';
import { Button } from './Button';

export const FormAddFriend = ({ onAdd }) => {
	const IMG_BASE = 'https://i.pravatar.cc/48';

	const [name, setName] = useState('');
	const [image, setImage] = useState(IMG_BASE);

	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!name || !image) return;

		const id = crypto.randomUUID();

		const newFriend = {
			id,
			name,
			image: `${IMG_BASE}?=${id}`,
			balance: 0,
		};

		onAdd(newFriend);
		setName('');
		setImage('');
	};

	return (
		<form className='form-add-friend' onSubmit={handleSubmit}>
			<label htmlFor='name'>🤷‍♀️ Friend name</label>
			<input
				ref={inputRef}
				id='name'
				type='text'
				placeholder='Name...'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label htmlFor='img'>🌄 Image URL</label>
			<input id='img' type='text' placeholder='Image...' value={image} onChange={(e) => setImage(e.target.value)} />
			<Button disabled={!name || !image}>Add</Button>
		</form>
	);
};
