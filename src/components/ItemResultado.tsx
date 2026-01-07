import React from 'react';
import { PontoTuristico } from '../types/PontoTuristico';
import './ItemResultado.css';

interface ItemResultadoProps {
  ponto: PontoTuristico;
  onEditar: (id: number) => void;
  onExcluir: (id: number) => void;
}

const ItemResultado: React.FC<ItemResultadoProps> = ({ ponto, onEditar, onExcluir }) => {
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const handleExcluir = () => {
    if (window.confirm(`Tem certeza que deseja excluir "${ponto.nome}"?`)) {
      onExcluir(ponto.id);
    }
  };

  return (
    <div className="item-resultado">
      <div className="item-header">
        <h3>{ponto.nome}</h3>
        <div className="item-header-right">
          <span className="item-data">
            {formatarData(ponto.dataInclusao)}
          </span>
          <div className="item-acoes">
            <button 
              className="btn-acao btn-editar" 
              onClick={() => onEditar(ponto.id)}
              title="Editar"
            >
              Editar
            </button>
            <button 
              className="btn-acao btn-excluir" 
              onClick={handleExcluir}
              title="Excluir"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
      <div className="item-localizacao">
        <span className="item-cidade">{ponto.cidade}</span>
        <span className="item-separator">•</span>
        <span className="item-estado">{ponto.estado}</span>
      </div>
      {ponto.referencia && (
        <div className="item-referencia">
          <strong>Referência:</strong> {ponto.referencia}
        </div>
      )}
      {ponto.descricao && (
        <p className="item-descricao">{ponto.descricao}</p>
      )}
    </div>
  );
};

export default ItemResultado;
