import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const passwordRequirements = [
  'At least 8 characters',
  'At least 1 number',
  'At least 1 capital letter',
  'At least 1 symbol',
];

const validateEmail = (email: string) => {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password: string) => {
  return (
    password.length >= 8 &&
    /[0-9]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
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
    if (!validatePassword(password)) {
      newErrors.password =
        'Password must be at least 8 characters and contain uppercase, lowercase, number, and symbol';
      valid = false;
    }
    if (!valid) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/'), 1500);
      } else if (data?.fields) {
        setErrors(data.fields);
      } else {
        setServerError(data?.error || 'Signup failed');
      }
    } catch {
      setServerError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='signup-page'>
      <h2>Sign Up</h2>
      <form className='signup-form' onSubmit={handleSubmit}>
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
            autoComplete='new-password'
            required
          />
          {errors.password && <div className='error'>{errors.password}</div>}
          <ul className='password-requirements'>
            {passwordRequirements.map(req => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {serverError && <div className='error'>{serverError}</div>}
        {success && (
          <div className='success'>Signup successful! Redirecting...</div>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
