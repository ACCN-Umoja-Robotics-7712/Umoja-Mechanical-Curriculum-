import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register');
    }
  };

  return (
    <div className="auth-card">
      <h2>Create your account</h2>
      <p>Join the Umoja learning community.</p>
      {error && <div className="alert alert--error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">
          Name
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label htmlFor="email">
          Email
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <label htmlFor="role">
          Role
          <select id="role" name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </label>
        <button type="submit" className="button">
          Sign Up
        </button>
      </form>
      <p className="auth-card__footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}

export default Register;
