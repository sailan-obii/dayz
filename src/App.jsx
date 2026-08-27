import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Today from './pages/Today';
import Upcoming from './pages/Upcoming';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/today-list" replace />} />
        <Route path="/today-list" element={<Today />} />
        <Route path="/upcoming" element={<Upcoming />} />
      </Routes>
    </>
  );
}

export default App;