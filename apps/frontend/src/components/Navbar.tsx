import { useUser } from '../hooks/useUser';
import splitLogo from '/split.svg';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, loading, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    // todo: implement logout API call
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
            <button
              className='auth-btn logout-btn'
              onClick={handleLogout}
              style={{ marginRight: '0.75rem' }}
            >
              Logout
            </button>
            <div className='user-avatar' title={user.email}>
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
