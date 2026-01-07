import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import FormularioPonto from '../components/FormularioPonto';
import { NovoPontoTuristico, PontoTuristico } from '../types/PontoTuristico';
import { cadastrarPontoTuristico, atualizarPontoTuristico, buscarPontosTuristicos } from '../api/pontosTuristicosApi';
import './Cadastro.css';

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [pontoAtual, setPontoAtual] = useState<PontoTuristico | null>(null);
  const [carregando, setCarregando] = useState(false);

  const isEdicao = !!id;

  useEffect(() => {
    const carregarPonto = async () => {
      if (id) {
        setCarregando(true);
        try {
          // Busca todos os pontos e filtra pelo ID
          const pontos = await buscarPontosTuristicos('');
          const ponto = pontos.find(p => p.id === parseInt(id));
          if (ponto) {
            setPontoAtual(ponto);
          } else {
            alert('Ponto turístico não encontrado');
            navigate('/');
          }
        } catch (error) {
          alert('Erro ao carregar ponto turístico');
          navigate('/');
        } finally {
          setCarregando(false);
        }
      }
    };

    carregarPonto();
  }, [id, navigate]);

  const handleSubmit = async (ponto: NovoPontoTuristico) => {
    if (isEdicao && id) {
      await atualizarPontoTuristico(parseInt(id), ponto);
      alert('Ponto turístico atualizado com sucesso!');
    } else {
      await cadastrarPontoTuristico(ponto);
      alert('Ponto turístico cadastrado com sucesso!');
    }
    navigate('/');
  };

  const handleCancelar = () => {
    navigate('/');
  };

  if (carregando) {
    return (
      <div className="page-cadastro">
        <Header />
        <div className="cadastro-container">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-cadastro">
      <Header />
      <div className="cadastro-container">
        <h2>{isEdicao ? 'Editar Ponto Turístico' : 'Cadastrar Novo Ponto Turístico'}</h2>
        <FormularioPonto 
          onSubmit={handleSubmit} 
          onCancelar={handleCancelar}
          pontoInicial={pontoAtual}
        />
      </div>
    </div>
  );
};

export default Cadastro;
