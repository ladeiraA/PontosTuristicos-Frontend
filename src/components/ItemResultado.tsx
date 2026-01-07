import React from 'react';
import { PontoTuristico } from '../types/PontoTuristico';
import './ItemResultado.css';

interface ItemResultadoProps {
  ponto: PontoTuristico;
}

const ItemResultado: React.FC<ItemResultadoProps> = ({ ponto }) => {
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div className="item-resultado">
      <div className="item-header">
        <h3>{ponto.nome}</h3>
        <span className="item-data">
          {formatarData(ponto.dataInclusao)}
        </span>
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
