import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutUs from '../pages/AboutUs';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
