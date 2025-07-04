import Button from './Button';

export const FriendItem = ({ data, onToggle, selected }) => {
	const { id, name, image, balance } = data;

	const isSelected = id === selected;

	return (
		<li className={isSelected ? 'selected' : null}>
			<img src={image} alt='Friend avatar' />
			<h3>{name}</h3>
			{/* MY INITIAL APPROACH */}
			{/* <p className={balance < 0 ? 'red' : balance > 0 ? 'green' : null}>
				{balance === 0
					? `You and ${name} are even`
					: balance < 0
					? `You owe ${name} $${Math.abs(balance)}`
					: `${name} owes you $${balance}`}
			</p> */}
			{/* BETTER */}
			{balance < 0 && (
				<p className='red'>
					You owe {name} ${Math.abs(balance)}
				</p>
			)}
			{balance > 0 && (
				<p className='green'>
					{name} owes you ${balance}
				</p>
			)}
			{balance === 0 && <p>You and {name} are even</p>}
			<Button onClick={() => onToggle(isSelected ? null : id)}>{isSelected ? 'Close' : 'Select'}</Button>
		</li>
	);
};
export default FriendItem;
