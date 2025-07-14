import type { Keyboard } from '../types/keyboard';
import './KeyboardCard.css';

interface KeyboardCardProps {
  keyboard: Keyboard;
}

const KeyboardCard = ({ keyboard }: KeyboardCardProps) => {
  return (
    <div className='keyboard-card'>
      <div className='keyboard-card-content'>
        <h3 className='keyboard-name'>{keyboard.name}</h3>
        <div className='keyboard-placeholder'>
          <span>Keyboard Preview</span>
        </div>
      </div>
    </div>
  );
};

export default KeyboardCard;
