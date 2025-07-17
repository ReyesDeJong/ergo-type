import { useState, useEffect } from 'react';
import splitLogo from '/split.svg';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    // TODO: Implement logout API call
    setUser(null);
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const getUserInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <nav className='navbar'>
      <div
        className='navbar-brand'
        onClick={handleHomeClick}
        style={{ cursor: 'pointer' }}
      >
        <img src={splitLogo} alt='ErgoType Logo' className='navbar-logo' />
        <span className='navbar-title'>ErgoType</span>
      </div>
      <div className='navbar-auth'>
        {loading && <div className='loading-spinner'></div>}
        {!loading && user && (
          <div className='user-section'>
            <div
              className='user-avatar'
              onClick={handleLogout}
              title='Click to logout'
            >
              <span className='user-initials'>
                {getUserInitial(user.email)}
              </span>
            </div>
          </div>
        )}
        {!loading && !user && (
          <div className='auth-buttons'>
            <button className='auth-btn login-btn' onClick={handleLogin}>
              Login
            </button>
            <button className='auth-btn signup-btn' onClick={handleSignup}>
              Signup
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
