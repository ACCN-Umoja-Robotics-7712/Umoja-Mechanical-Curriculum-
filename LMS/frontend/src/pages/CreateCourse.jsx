import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function CreateCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Mechanical Engineering',
    difficulty: 'beginner',
    durationWeeks: 1,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/courses', form);
      navigate(`/courses/${data.course._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <header className="section__header">
        <h2>Create a new course</h2>
        <p>Share your mechanical expertise with Umoja students.</p>
      </header>
      {error && <div className="alert alert--error">{error}</div>}
      <form onSubmit={handleSubmit} className="form form--stacked">
        <label htmlFor="title">
          Title
          <input id="title" name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label htmlFor="description">
          Description
          <textarea id="description" name="description" value={form.description} onChange={handleChange} required rows={4} />
        </label>
        <label htmlFor="category">
          Category
          <input id="category" name="category" value={form.category} onChange={handleChange} />
        </label>
        <label htmlFor="difficulty">
          Difficulty
          <select id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label htmlFor="durationWeeks">
          Duration (weeks)
          <input
            id="durationWeeks"
            name="durationWeeks"
            type="number"
            min="1"
            value={form.durationWeeks}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </section>
  );
}

export default CreateCourse;
