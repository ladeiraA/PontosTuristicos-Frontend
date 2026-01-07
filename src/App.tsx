import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pesquisa from './pages/Pesquisa';
import Cadastro from './pages/Cadastro';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pesquisa />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
};

export default App;
