import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ListaResultados from '../components/ListaResultados';
import { PontoTuristico } from '../types/PontoTuristico';
import { buscarPontosTuristicos } from '../api/pontosTuristicosApi';
import './Pesquisa.css';

const Pesquisa: React.FC = () => {
  const navigate = useNavigate();
  const [termo, setTermo] = useState('');
  const [pontos, setPontos] = useState<PontoTuristico[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  const handleBuscar = async () => {
    setCarregando(true);
    setBuscaRealizada(true);
    try {
      const resultados = await buscarPontosTuristicos(termo);
      setPontos(resultados);
    } catch (error) {
      alert('Erro ao buscar pontos turísticos. Verifique sua conexão e tente novamente.');
      setPontos([]);
    } finally {
      setCarregando(false);
    }
  };

  const handleCadastrar = () => {
    navigate('/cadastro');
  };

  return (
    <div className="page-pesquisa">
      <Header />
      <SearchBar
        termo={termo}
        onTermoChange={setTermo}
        onBuscar={handleBuscar}
        onCadastrar={handleCadastrar}
      />
      <ListaResultados
        pontos={pontos}
        carregando={carregando}
        buscaRealizada={buscaRealizada}
      />
    </div>
  );
};

export default Pesquisa;
