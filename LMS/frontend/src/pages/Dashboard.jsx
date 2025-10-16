import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/progress/mine')
      .then((response) => {
        setEnrollments(response.data.enrollments || []);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Unable to load dashboard');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section">
      <header className="section__header">
        <h2>Your Learning Journey</h2>
        <p>Track progress and continue your mechanical mastery.</p>
      </header>
      {loading && <div className="loading">Loading dashboard...</div>}
      {error && <div className="alert alert--error">{error}</div>}
      {!loading && !error && (
        <div className="grid">
          {enrollments.map((enrollment) => (
            <div key={enrollment._id} className="card">
              <h3>{enrollment.course.title}</h3>
              <p>{enrollment.course.description}</p>
              <p>Status: {enrollment.status}</p>
              <Link to={`/courses/${enrollment.course._id}`} className="button button--ghost">
                Continue Course
              </Link>
            </div>
          ))}
          {enrollments.length === 0 && <p>You are not enrolled in any courses yet. Explore the course catalog to get started!</p>}
        </div>
      )}
    </section>
  );
}

export default Dashboard;
