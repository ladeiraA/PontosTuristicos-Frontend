import React from 'react';
import { PontoTuristico } from '../types/PontoTuristico';
import ItemResultado from './ItemResultado';
import Paginacao from './Paginacao';
import './ListaResultados.css';

interface ListaResultadosProps {
  pontos: PontoTuristico[];
  carregando: boolean;
  buscaRealizada: boolean;
  onEditar: (id: number) => void;
  onExcluir: (id: number) => void;
  // Props de paginação
  paginaAtual?: number;
  totalPaginas?: number;
  totalItens?: number;
  onMudarPagina?: (pagina: number) => void;
}

const ListaResultados: React.FC<ListaResultadosProps> = ({ 
  pontos, 
  carregando, 
  buscaRealizada,
  onEditar,
  onExcluir,
  paginaAtual,
  totalPaginas,
  totalItens,
  onMudarPagina
}) => {
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

  if (!pontos || pontos.length === 0) {
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
          {totalItens !== undefined ? totalItens : (pontos?.length || 0)}{' '}
          {(totalItens !== undefined ? totalItens : (pontos?.length || 0)) === 1 ? 'ponto encontrado' : 'pontos encontrados'}
        </span>
      </div>
      <div className="lista-resultados">
        {pontos?.map((ponto) => (
          <ItemResultado 
            key={ponto.id} 
            ponto={ponto}
            onEditar={onEditar}
            onExcluir={onExcluir}
          />
        ))}
      </div>
      {paginaAtual && totalPaginas && totalItens !== undefined && onMudarPagina && (
        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          totalItens={totalItens}
          onMudarPagina={onMudarPagina}
        />
      )}
    </div>
  );
};

export default ListaResultados;
