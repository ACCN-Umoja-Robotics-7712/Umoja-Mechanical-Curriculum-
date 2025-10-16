import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  return (
    <div className="card">
      <div className="card__header">
        <h3>{course.title}</h3>
        <span className={`tag tag--${course.difficulty}`}>{course.difficulty}</span>
      </div>
      <p className="card__description">{course.description}</p>
      <div className="card__meta">
        <span>{course.category}</span>
        {course.instructor && <span>Instructor: {course.instructor.name}</span>}
      </div>
      <Link to={`/courses/${course._id}`} className="button button--ghost">
        View Course
      </Link>
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    category: PropTypes.string,
    instructor: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default CourseCard;
