import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Keyboard } from '../types/keyboard';
import { keyboardService } from '../services/keyboardService';
import './KeyboardPreviewPage.css';

const KeyboardPreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [keyboard, setKeyboard] = useState<Keyboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeyboard = async () => {
      if (!id) return;

      try {
        const data = await keyboardService.getKeyboardById(parseInt(id));
        setKeyboard(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch keyboard'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchKeyboard();
  }, [id]);

  if (loading) {
    return <div className='loading'>Loading keyboard...</div>;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  if (!keyboard) {
    return <div className='error'>Keyboard not found</div>;
  }

  return (
    <div className='keyboard-preview-page'>
      <header className='preview-header'>
        <Link to='/' className='back-link'>
          ← Back to Keyboards
        </Link>
        <h1>{keyboard.name}</h1>
      </header>

      <main className='preview-content'>
        <div className='keyboard-details'>
          <div className='keyboard-preview-placeholder'>
            <h2>Keyboard Preview</h2>
            <p>Detailed view for {keyboard.name}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KeyboardPreviewPage;
