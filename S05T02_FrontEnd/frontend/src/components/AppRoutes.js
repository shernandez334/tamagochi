import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;