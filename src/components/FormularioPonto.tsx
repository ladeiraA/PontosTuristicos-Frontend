import React, { useState, useEffect } from 'react';
import { NovoPontoTuristico, PontoTuristico } from '../types/PontoTuristico';
import './FormularioPonto.css';

interface FormularioPontoProps {
  onSubmit: (ponto: NovoPontoTuristico) => Promise<void>;
  onCancelar: () => void;
  pontoInicial?: PontoTuristico | null;
}

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const FormularioPonto: React.FC<FormularioPontoProps> = ({ onSubmit, onCancelar, pontoInicial }) => {
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [referencia, setReferencia] = useState('');
  const [descricao, setDescricao] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Carrega os dados iniciais quando está editando
  useEffect(() => {
    if (pontoInicial) {
      setNome(pontoInicial.nome);
      setCidade(pontoInicial.cidade);
      setEstado(pontoInicial.estado);
      setReferencia(pontoInicial.referencia);
      setDescricao(pontoInicial.descricao);
    }
  }, [pontoInicial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !cidade || !estado || !referencia || !descricao) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setEnviando(true);
    try {
      await onSubmit({ nome, cidade, estado, referencia, descricao });
    } catch (error) {
      alert('Erro ao cadastrar ponto turístico. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-ponto">
      <div className="form-group">
        <label htmlFor="nome">Nome *</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Cristo Redentor"
          required
          disabled={enviando}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cidade">Cidade *</label>
          <input
            id="cidade"
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Ex: Rio de Janeiro"
            required
            disabled={enviando}
          />
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado *</label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
            disabled={enviando}
          >
            <option value="">Selecione...</option>
            {ESTADOS_BRASIL.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="referencia">Referência *</label>
        <input
          id="referencia"
          type="text"
          value={referencia}
          onChange={(e) => setReferencia(e.target.value)}
          placeholder="Ex: Morro do Corcovado"
          required
          disabled={enviando}
        />
      </div>

      <div className="form-group">
        <label htmlFor="descricao">Descrição *</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva o ponto turístico..."
          rows={5}
          required
          disabled={enviando}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancelar} className="btn btn-secondary" disabled={enviando}>
          Voltar
        </button>
        <button type="submit" className="btn btn-success" disabled={enviando}>
          {enviando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
};

export default FormularioPonto;
