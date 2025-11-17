import { useState, useEffect } from 'react';
import KeyboardCard from '../keyboards/components/KeyboardCard';
import './EducationKeyboardsPage.css';

export interface Keyboard {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

const VIEW_MODE = {
  grid: 'grid',
  list: 'list',
};

export const DISCOUNT_PERCENTAGE_TO_APPLY = 10;

const initialKeyboards: Keyboard[] = [
  {
    id: 1,
    name: 'Ergo Type',
    price: 100,
    image: 'https://placehold.co/150x100',
    description: 'This is a description of the keyboard',
    stock: 2,
  },
  {
    id: 2,
    name: 'Ergo Type 2',
    price: 100,
    image: 'https://placehold.co/150x100',
    description: 'This is a description of the keyboard',
    stock: 3,
  },
  {
    id: 3,
    name: 'Ergo Type 3',
    price: 100,
    image: 'https://placehold.co/150x100',
    description: 'This is a description of the keyboard',
    stock: 0,
  },
];

const EducationKeyboardsPage = () => {
  const [viewMode, setViewMode] = useState<string>(VIEW_MODE.grid);
  const [keyboards, _setKeyboards] = useState<Keyboard[]>(initialKeyboards);
  const [isDiscountApplied, setIsDiscountApplied] = useState<boolean>(false);

  const toggleDiscount = () => {
    setIsDiscountApplied(!isDiscountApplied);
  };

  console.log('Render phase: EducationKeyboardsPage render');
  useEffect(() => {
    console.log('Commit phase: EducationKeyboardsPage render');
  });
  return (
    <div>
      <h1>Education Keyboards Page</h1>
      <div className='controls-container'>
        <div className='view-mode-buttons'>
          {viewMode === VIEW_MODE.list && (
            <button
              onClick={() => {
                setViewMode(VIEW_MODE.grid);
              }}
            >
              Toggle to Grid View
            </button>
          )}
          {viewMode === VIEW_MODE.grid && (
            <button
              onClick={() => {
                setViewMode(VIEW_MODE.list);
              }}
            >
              Toggle to List View
            </button>
          )}
        </div>
        <div className='discount-button'>
          <button onClick={toggleDiscount}>
            {isDiscountApplied ? 'Turn off discount' : 'Apply Discount'}
          </button>
        </div>
      </div>
      <div className='keyboards-grid'>
        {
          // viewMode === VIEW_MODE.grid &&
          keyboards.map(keyboard => (
            <KeyboardCard
              key={keyboard.id}
              keyboard={keyboard}
              isDiscountApplied={isDiscountApplied}
            />
          ))
        }
      </div>
    </div>
  );
};

export default EducationKeyboardsPage;
