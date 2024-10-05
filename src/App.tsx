import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import UserDetailPage from './pages/UserDetailPage.tsx';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
