import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutUs from '../pages/AboutUs';
import CharacterPage from '../pages/CharacterPage/CharacterPage';
import CreateCardPage from '../pages/CreateCardPage';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards/:id" element={<CharacterPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/create-card" element={<CreateCardPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
