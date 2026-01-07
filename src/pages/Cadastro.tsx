import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FormularioPonto from '../components/FormularioPonto';
import { NovoPontoTuristico } from '../types/PontoTuristico';
import { cadastrarPontoTuristico } from '../api/pontosTuristicosApi';
import './Cadastro.css';

const Cadastro: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (ponto: NovoPontoTuristico) => {
    await cadastrarPontoTuristico(ponto);
    alert('Ponto turístico cadastrado com sucesso!');
    navigate('/');
  };

  const handleCancelar = () => {
    navigate('/');
  };

  return (
    <div className="page-cadastro">
      <Header />
      <div className="cadastro-container">
        <h2>Cadastrar Novo Ponto Turístico</h2>
        <FormularioPonto onSubmit={handleSubmit} onCancelar={handleCancelar} />
      </div>
    </div>
  );
};

export default Cadastro;
