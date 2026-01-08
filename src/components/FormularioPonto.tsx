import React, { useState, useEffect } from 'react';
import { NovoPontoTuristico, PontoTuristico } from '../types/PontoTuristico';
import Swal from 'sweetalert2';
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

const MAX_CARACTERES = 100;

const FormularioPonto: React.FC<FormularioPontoProps> = ({ onSubmit, onCancelar, pontoInicial }) => {
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [referencia, setReferencia] = useState('');
  const [descricao, setDescricao] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [focoNome, setFocoNome] = useState(false);
  const [focoCidade, setFocoCidade] = useState(false);
  const [focoReferencia, setFocoReferencia] = useState(false);
  const [focoDescricao, setFocoDescricao] = useState(false);

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
    
    if (!nome.trim() || !cidade.trim() || !estado || !referencia.trim() || !descricao.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Por favor, preencha todos os campos corretamente',
        confirmButtonColor: '#3498db'
      });
      return;
    }

    if (nome.length > MAX_CARACTERES || cidade.length > MAX_CARACTERES || 
        referencia.length > MAX_CARACTERES || descricao.length > MAX_CARACTERES) {
      Swal.fire({
        icon: 'error',
        title: 'Limite excedido',
        text: `Todos os campos devem ter no máximo ${MAX_CARACTERES} caracteres`,
        confirmButtonColor: '#3498db'
      });
      return;
    }

    setEnviando(true);
    try {
      await onSubmit({ 
        nome: nome.trim(), 
        cidade: cidade.trim(), 
        estado, 
        referencia: referencia.trim(), 
        descricao: descricao.trim() 
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao cadastrar ponto turístico. Tente novamente.',
        confirmButtonColor: '#3498db'
      });
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
          onFocus={() => setFocoNome(true)}
          onBlur={() => setFocoNome(false)}
          placeholder="Ex: Cristo Redentor"
          maxLength={MAX_CARACTERES}
          required
          disabled={enviando}
        />
        {focoNome && (
          <small className='contador'>
            {nome.length}/{MAX_CARACTERES} caracteres
          </small>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cidade">Cidade *</label>
          <input
            id="cidade"
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            onFocus={() => setFocoCidade(true)}
            onBlur={() => setFocoCidade(false)}
            placeholder="Ex: Rio de Janeiro"
            maxLength={MAX_CARACTERES}
            required
            disabled={enviando}
          />
          {focoCidade && (
            <small className='contador'>
              {cidade.length}/{MAX_CARACTERES} caracteres
            </small>
          )}
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
          onFocus={() => setFocoReferencia(true)}
          onBlur={() => setFocoReferencia(false)}
          placeholder="Ex: Morro do Corcovado"
          maxLength={MAX_CARACTERES}
          required
          disabled={enviando}
        />
        {focoReferencia && (
          <small className='contador'>
            {referencia.length}/{MAX_CARACTERES} caracteres
          </small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="descricao">Descrição *</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          onFocus={() => setFocoDescricao(true)}
          onBlur={() => setFocoDescricao(false)}
          placeholder="Descreva o ponto turístico..."
          rows={5}
          maxLength={MAX_CARACTERES}
          required
          disabled={enviando}
        />
        {focoDescricao && (
          <small className='contador'>
            {descricao.length}/{MAX_CARACTERES} caracteres
          </small>
        )}
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
