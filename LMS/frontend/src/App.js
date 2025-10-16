import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import CourseCatalog from './pages/CourseCatalog.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import CreateCourse from './pages/CreateCourse.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EditCourse from './pages/EditCourse.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<CourseCatalog />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route element={<ProtectedRoute roles={['student', 'instructor', 'admin']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute roles={['instructor', 'admin']} />}>
              <Route path="/courses/create" element={<CreateCourse />} />
              <Route path="/courses/:id/edit" element={<EditCourse />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
