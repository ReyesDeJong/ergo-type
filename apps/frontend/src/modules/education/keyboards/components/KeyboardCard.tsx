import type { Keyboard } from '../../pages/EducationKeyboardsPage';

interface KeyboardCardProps {
  keyboard: Keyboard;
}

const KeyboardCard = ({ keyboard }: KeyboardCardProps) => {
  return (
    <div>
      <h3>{keyboard.name}</h3>
      <p>{keyboard.description}</p>
      <p>{keyboard.price}</p>
      <p>{keyboard.isAvailable ? 'Available' : 'Not Available'}</p>
    </div>
  );
};

export default KeyboardCard;
