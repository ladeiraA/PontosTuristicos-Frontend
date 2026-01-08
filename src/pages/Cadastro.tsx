import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
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
          const resultado = await buscarPontosTuristicos('');
          
          // Verifica se a API retornou objeto paginado ou array direto
          const pontos = Array.isArray(resultado) ? resultado : resultado.items;
          const ponto = pontos.find((p: PontoTuristico) => p.id === parseInt(id));
          
          if (ponto) {
            setPontoAtual(ponto);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Não encontrado',
              text: 'Ponto turístico não encontrado',
              confirmButtonColor: '#3498db'
            });
            navigate('/');
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao carregar ponto turístico',
            confirmButtonColor: '#3498db'
          });
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
      await Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Ponto turístico atualizado com sucesso!',
        confirmButtonColor: '#3498db',
        timer: 2000
      });
    } else {
      await cadastrarPontoTuristico(ponto);
      await Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Ponto turístico cadastrado com sucesso!',
        confirmButtonColor: '#3498db',
        timer: 2000
      });
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
