import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import './LoginPage.css';

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { checkAuthStatus } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    let valid = true;
    const newErrors: { email?: string; password?: string } = {};
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    if (!valid) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        await checkAuthStatus();
        navigate('/');
      } else if (data?.fields) {
        setErrors(data.fields);
      } else {
        setServerError(data?.error || 'Login failed');
      }
    } catch {
      setServerError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-page'>
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete='email'
            required
          />
          {errors.email && <div className='error'>{errors.email}</div>}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete='current-password'
            required
          />
          {errors.password && <div className='error'>{errors.password}</div>}
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {serverError && <div className='error'>{serverError}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
