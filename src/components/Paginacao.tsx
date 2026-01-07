import React from 'react';
import './Paginacao.css';

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  totalItens: number;
  onMudarPagina: (pagina: number) => void;
}

const Paginacao: React.FC<PaginacaoProps> = ({
  paginaAtual,
  totalPaginas,
  totalItens,
  onMudarPagina
}) => {
  if (totalPaginas <= 1) {
    return null; // Não mostrar paginação se houver apenas 1 página
  }

  const handleAnterior = () => {
    if (paginaAtual > 1) {
      onMudarPagina(paginaAtual - 1);
    }
  };

  const handleProximo = () => {
    if (paginaAtual < totalPaginas) {
      onMudarPagina(paginaAtual + 1);
    }
  };

  return (
    <div className="paginacao">
      <div className="paginacao-info">
        Página {paginaAtual} de {totalPaginas} ({totalItens} {totalItens === 1 ? 'resultado' : 'resultados'})
      </div>
      <div className="paginacao-controles">
        <button
          className="btn-paginacao"
          onClick={handleAnterior}
          disabled={paginaAtual === 1}
        >
          ← Anterior
        </button>
        <span className="paginacao-atual">{paginaAtual}</span>
        <button
          className="btn-paginacao"
          onClick={handleProximo}
          disabled={paginaAtual === totalPaginas}
        >
          Próximo →
        </button>
      </div>
    </div>
  );
};

export default Paginacao;
