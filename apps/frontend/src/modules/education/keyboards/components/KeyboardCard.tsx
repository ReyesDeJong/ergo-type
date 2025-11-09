import type { Keyboard } from '../../pages/EducationKeyboardsPage';
import './KeyboardCard.css';

interface KeyboardCardProps {
  keyboard: Keyboard;
}

const KeyboardCard = ({ keyboard }: KeyboardCardProps) => {
  return (
    <div className='keyboard-card'>
      <div className='keyboard-card-content'>
        <h3 className='keyboard-name'>{keyboard.name}</h3>
        <p className='keyboard-attribute'>{keyboard.description}</p>
        <p className='keyboard-attribute'>{keyboard.price}</p>
      </div>
    </div>
  );
};

export default KeyboardCard;
