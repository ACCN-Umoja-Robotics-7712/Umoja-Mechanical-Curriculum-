import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [lessonForm, setLessonForm] = useState({ title: '', overview: '', durationMinutes: 60 });

  useEffect(() => {
    api
      .get(`/courses/${id}`)
      .then((response) => setCourse(response.data.course))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load course'));
  }, [id]);

  const handleCourseChange = (event) => {
    const { name, value } = event.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCourse = async (event) => {
    event.preventDefault();
    try {
      await api.patch(`/courses/${id}`, {
        title: course.title,
        description: course.description,
        category: course.category,
        difficulty: course.difficulty,
        durationWeeks: course.durationWeeks,
      });
      navigate(`/courses/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save course');
    }
  };

  const handleAddLesson = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post(`/courses/${id}/lessons`, lessonForm);
      setCourse(data.course);
      setLessonForm({ title: '', overview: '', durationMinutes: 60 });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add lesson');
    }
  };

  if (!course) {
    return <div className="loading">Loading course...</div>;
  }

  return (
    <section className="section">
      <header className="section__header">
        <h2>Edit {course.title}</h2>
      </header>
      {error && <div className="alert alert--error">{error}</div>}
      <form className="form form--stacked" onSubmit={handleSaveCourse}>
        <label htmlFor="title">
          Title
          <input id="title" name="title" value={course.title} onChange={handleCourseChange} required />
        </label>
        <label htmlFor="description">
          Description
          <textarea id="description" name="description" value={course.description} onChange={handleCourseChange} required rows={4} />
        </label>
        <label htmlFor="category">
          Category
          <input id="category" name="category" value={course.category} onChange={handleCourseChange} />
        </label>
        <label htmlFor="difficulty">
          Difficulty
          <select id="difficulty" name="difficulty" value={course.difficulty} onChange={handleCourseChange}>
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
            value={course.durationWeeks}
            onChange={handleCourseChange}
          />
        </label>
        <button type="submit" className="button">
          Save Changes
        </button>
      </form>

      <section className="section section--sub">
        <h3>Add Lesson</h3>
        <form className="form form--stacked" onSubmit={handleAddLesson}>
          <label htmlFor="lesson-title">
            Lesson Title
            <input id="lesson-title" name="title" value={lessonForm.title} onChange={(e) => setLessonForm((prev) => ({ ...prev, title: e.target.value }))} required />
          </label>
          <label htmlFor="lesson-overview">
            Overview
            <textarea
              id="lesson-overview"
              name="overview"
              value={lessonForm.overview}
              onChange={(e) => setLessonForm((prev) => ({ ...prev, overview: e.target.value }))}
              required
              rows={3}
            />
          </label>
          <label htmlFor="lesson-duration">
            Duration (minutes)
            <input
              id="lesson-duration"
              name="durationMinutes"
              type="number"
              min="10"
              value={lessonForm.durationMinutes}
              onChange={(e) => setLessonForm((prev) => ({ ...prev, durationMinutes: Number(e.target.value) }))}
            />
          </label>
          <button type="submit" className="button button--ghost">
            Add Lesson
          </button>
        </form>
      </section>
    </section>
  );
}

export default EditCourse;
