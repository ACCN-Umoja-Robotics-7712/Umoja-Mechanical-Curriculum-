import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to log in');
    }
  };

  return (
    <div className="auth-card">
      <h2>Welcome back</h2>
      <p>Please sign in to continue.</p>
      {error && <div className="alert alert--error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">
          Email
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit" className="button">
          Sign In
        </button>
      </form>
      <p className="auth-card__footer">
        Don&apos;t have an account? <Link to="/register">Create one here</Link>
      </p>
    </div>
  );
}

export default Login;
