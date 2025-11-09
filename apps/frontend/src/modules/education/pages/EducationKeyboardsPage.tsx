import { useState } from 'react';
import KeyboardCard from '../keyboards/components/KeyboardCard';
import './EducationKeyboardsPage.css';

export interface Keyboard {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  isAvailable: boolean;
}

const VIEW_MODE = {
  grid: 'grid',
  list: 'list',
};

const initialKeyboards: Keyboard[] = [
  {
    id: 1,
    name: 'Ergo Type',
    price: 100,
    image: 'https://via.placeholder.com/150',
    description: 'This is a description of the keyboard',
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Ergo Type 2',
    price: 100,
    image: 'https://via.placeholder.com/150',
    description: 'This is a description of the keyboard',
    isAvailable: true,
  },
  {
    id: 3,
    name: 'Ergo Type 3',
    price: 100,
    image: 'https://via.placeholder.com/150',
    description: 'This is a description of the keyboard',
    isAvailable: false,
  },
];

const EducationKeyboardsPage = () => {
  const [_viewMode, _setViewMode] = useState<string>(VIEW_MODE.grid);
  const [keyboards, _setKeyboards] = useState<Keyboard[]>(initialKeyboards);
  return (
    <div>
      <h1>Education Keyboards Page</h1>
      <div className='keyboards-grid'>
        {keyboards.map(keyboard => (
          <KeyboardCard key={keyboard.id} keyboard={keyboard} />
        ))}
      </div>
    </div>
  );
};

export default EducationKeyboardsPage;
