import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="nav__brand">
        Umoja LMS
      </Link>
      <div className="nav__links">
        <NavLink to="/courses">Courses</NavLink>
        {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
        {isAuthenticated && user?.role !== 'student' && <NavLink to="/courses/create">Create Course</NavLink>}
      </div>
      <div className="nav__actions">
        {isAuthenticated ? (
          <>
            <span className="nav__user">Hi, {user.name}</span>
            <button type="button" className="button button--secondary" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="button button--secondary">
              Login
            </NavLink>
            <NavLink to="/register" className="button">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
