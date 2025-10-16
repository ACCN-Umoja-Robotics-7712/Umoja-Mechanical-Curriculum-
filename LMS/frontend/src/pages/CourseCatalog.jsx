import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

function CourseCatalog() {
  const { isAuthenticated, user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ search: '', difficulty: 'all' });

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.difficulty !== 'all') params.append('difficulty', filters.difficulty);
    if (isAuthenticated && ['admin', 'instructor'].includes(user.role)) {
      params.append('includeDrafts', 'true');
    }

    api
      .get(`/courses?${params.toString()}`, { signal: controller.signal })
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((err) => {
        if (err.name !== 'CanceledError') {
          setError(err.response?.data?.message || 'Unable to load courses');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [filters, isAuthenticated, user]);

  return (
    <section className="section">
      <header className="section__header">
        <h2>Explore Umoja Courses</h2>
        <div className="filters">
          <input
            placeholder="Search courses"
            value={filters.search}
            onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
          />
          <select
            value={filters.difficulty}
            onChange={(event) => setFilters((prev) => ({ ...prev, difficulty: event.target.value }))}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </header>
      {loading && <div className="loading">Loading courses...</div>}
      {error && <div className="alert alert--error">{error}</div>}
      {!loading && !error && (
        <div className="grid">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
          {courses.length === 0 && <p>No courses found. Try adjusting your filters.</p>}
        </div>
      )}
    </section>
  );
}

export default CourseCatalog;
