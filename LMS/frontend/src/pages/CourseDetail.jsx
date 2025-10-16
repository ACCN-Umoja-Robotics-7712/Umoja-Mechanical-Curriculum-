import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LessonList from '../components/LessonList.jsx';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const isInstructor = useMemo(() => user?.role === 'instructor' && course?.instructor?._id === user.id, [user, course]);

  useEffect(() => {
    const loadCourse = () =>
      api
        .get(`/courses/${id}`)
        .then((response) => {
          setCourse(response.data.course);
        })
        .catch((err) => {
          setError(err.response?.data?.message || 'Unable to load course');
        })
        .finally(() => setLoading(false));
    
    loadCourse();
  }, [id]);

  useEffect(() => {
    const loadProgress = () => {
      if (!isAuthenticated) return;
      api
        .get(`/progress/${id}`)
        .then((response) => {
          setEnrollment(response.data.enrollment);
        })
        .catch(() => {
          setEnrollment(null);
        });
    };
    
    loadProgress();
  }, [id, isAuthenticated]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      const { data } = await api.post('/progress/enroll', { courseId: id });
      setEnrollment(data.enrollment);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to enroll');
    }
  };

  const handleToggleLesson = async (lessonId, completed) => {
    try {
      const { data } = await api.post(`/progress/${id}/lessons`, { lessonId, completed });
      setEnrollment(data.enrollment);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update progress');
    }
  };

  if (loading) {
    return <div className="loading">Loading course...</div>;
  }

  if (error) {
    return <div className="alert alert--error">{error}</div>;
  }

  if (!course) {
    return <div>No course found.</div>;
  }

  return (
    <section className="section">
      <header className="section__header">
        <h1>{course.title}</h1>
        <div className="section__meta">
          <span className={`tag tag--${course.difficulty}`}>{course.difficulty}</span>
          <span>{course.category}</span>
          {course.instructor && <span>Instructor: {course.instructor.name}</span>}
        </div>
        <p className="section__description">{course.description}</p>
        {!isAuthenticated || !enrollment ? (
          <button type="button" className="button" onClick={handleEnroll}>
            Enroll in Course
          </button>
        ) : (
          <div className="alert alert--success">You&apos;re enrolled! Keep up the great work.</div>
        )}
        {isInstructor && (
          <button type="button" className="button button--ghost" onClick={() => navigate(`/courses/${id}/edit`)}>
            Edit Course
          </button>
        )}
      </header>

      <h3>Lessons</h3>
      <LessonList lessons={course.lessons || []} progress={enrollment?.progress?.map((p) => ({ ...p, lessonId: p.lessonId?.toString?.() ?? p.lessonId }))} onToggle={handleToggleLesson} />
    </section>
  );
}

export default CourseDetail;
