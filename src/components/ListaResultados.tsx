import React from 'react';
import { PontoTuristico } from '../types/PontoTuristico';
import ItemResultado from './ItemResultado';
import './ListaResultados.css';

interface ListaResultadosProps {
  pontos: PontoTuristico[];
  carregando: boolean;
  buscaRealizada: boolean;
}

const ListaResultados: React.FC<ListaResultadosProps> = ({ pontos, carregando, buscaRealizada }) => {
  if (carregando) {
    return (
      <div className="lista-container">
        <div className="mensagem-info">Carregando...</div>
      </div>
    );
  }

  if (!buscaRealizada) {
    return (
      <div className="lista-container">
        <div className="mensagem-info">
          Use o campo de busca acima para encontrar pontos turísticos
        </div>
      </div>
    );
  }

  if (pontos.length === 0) {
    return (
      <div className="lista-container">
        <div className="mensagem-vazio">
          Nenhum ponto turístico encontrado. Tente uma busca diferente!
        </div>
      </div>
    );
  }

  return (
    <div className="lista-container">
      <div className="lista-header">
        <h2>Resultados da Busca</h2>
        <span className="lista-total">
          {pontos.length} {pontos.length === 1 ? 'ponto encontrado' : 'pontos encontrados'}
        </span>
      </div>
      <div className="lista-resultados">
        {pontos.map((ponto) => (
          <ItemResultado key={ponto.id} ponto={ponto} />
        ))}
      </div>
    </div>
  );
};

export default ListaResultados;
