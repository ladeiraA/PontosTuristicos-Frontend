import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pesquisa from './pages/Pesquisa';
import Cadastro from './pages/Cadastro';
import './App.css';

const App: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Pesquisa />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro/:id" element={<Cadastro />} />
      </Routes>
    </Router>
  );
};

export default App;
