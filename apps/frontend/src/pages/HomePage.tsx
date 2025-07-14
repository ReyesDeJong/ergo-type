import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Keyboard } from '../types/keyboard';
import { keyboardService } from '../services/keyboardService';
import KeyboardCard from '../components/KeyboardCard';
import './HomePage.css';

const HomePage = () => {
  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeyboards = async () => {
      try {
        const data = await keyboardService.getAllKeyboards();
        setKeyboards(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch keyboards'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchKeyboards();
  }, []);

  if (loading) {
    return <div className='loading'>Loading keyboards...</div>;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  return (
    <div className='home-page'>
      <header className='home-header'>
        <h1>Ergo Type</h1>
        <p>Discover the perfect split keyboard for your typing needs</p>
      </header>

      <main className='keyboards-grid'>
        {keyboards.map(keyboard => (
          <Link
            key={keyboard.id}
            to={`/keyboard/${keyboard.id}`}
            className='keyboard-link'
          >
            <KeyboardCard keyboard={keyboard} />
          </Link>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
