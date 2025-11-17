import { useEffect, useRef, useState } from 'react';
import type { Keyboard } from '../../pages/EducationKeyboardsPage';
import './KeyboardCard.css';
import { DISCOUNT_PERCENTAGE_TO_APPLY } from '../../pages/EducationKeyboardsPage';

interface KeyboardCardProps {
  keyboard: Keyboard;
  isDiscountApplied: boolean;
}

const KeyboardCard = ({ keyboard, isDiscountApplied }: KeyboardCardProps) => {
  const [orderQuantity, setOrderQuantity] = useState(0);
  const renderCountRef = useRef(0);
  const isInitialRenderRef = useRef(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const isAvailable = keyboard.stock > orderQuantity;

  renderCountRef.current += 1;
  const renderCount = renderCountRef.current;
  const isInitialRender = isInitialRenderRef.current;

  const keyboardPrice = (keyboard: Keyboard) => {
    if (isDiscountApplied && keyboard.stock > 0) {
      return keyboard.price * (1 - DISCOUNT_PERCENTAGE_TO_APPLY / 100);
    }
    return keyboard.price;
  };

  console.log(
    `[RENDER PHASE] KeyboardCard (${keyboard.name}) - Render #${renderCount} - isInitialRender: ${isInitialRender}`
  );

  useEffect(() => {
    console.log(
      `[COMMIT PHASE] KeyboardCard (${keyboard.name}) - Render #${renderCount} - isInitialRender: ${isInitialRender}`
    );
    const card = cardRef.current;
    if (card) {
      const className = isInitialRender ? 'render-initial' : 'render-update';
      card.classList.remove('render-initial', 'render-update');
      void card.offsetWidth;
      card.classList.add(className);
    }

    if (isInitialRender) {
      isInitialRenderRef.current = false;
    }
  });

  useEffect(() => {
    console.log(
      `[COMMIT PHASE] KeyboardCard (${keyboard.name}) - keyboard.price: ${keyboard.price}`
    );
  }, [keyboard]);

  const onDecreaseOrderQuantity = () => {
    if (orderQuantity > 0) {
      setOrderQuantity(orderQuantity - 1);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`keyboard-card ${isInitialRender ? 'render-initial' : 'render-update'}`}
    >
      <div className='keyboard-card-content'>
        <div className='keyboard-render-count'>
          <p className='keyboard-attribute'>Render Count: {renderCount}</p>
          <p className='keyboard-attribute'>
            Is Initial Render: {isInitialRender ? '✅' : '❌'}
          </p>
        </div>
        <h3 className='keyboard-name'>{keyboard.name}</h3>
        <img
          src={keyboard.image}
          alt={keyboard.name}
          className='keyboard-image'
        />
        <p className='keyboard-attribute'>{keyboard.description}</p>
        <div className='keyboard-bottom-attributes'>
          <p className='keyboard-attribute'>Price: {keyboardPrice(keyboard)}</p>
          <p className='keyboard-attribute'>
            Stock: {isAvailable ? '✅ Available' : '❌ Out of stock'}
          </p>
        </div>
        <div className='keyboard-order-display'>
          <button onClick={onDecreaseOrderQuantity}>-</button>
          <p className='keyboard-attribute'>Order Quantity: {orderQuantity}</p>
          <button onClick={() => setOrderQuantity(orderQuantity + 1)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default KeyboardCard;
