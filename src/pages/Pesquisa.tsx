import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ListaResultados from '../components/ListaResultados';
import { PontoTuristico } from '../types/PontoTuristico';
import { buscarPontosTuristicos, excluirPontoTuristico } from '../api/pontosTuristicosApi';
import './Pesquisa.css';

const Pesquisa: React.FC = () => {
  const navigate = useNavigate();
  const [termo, setTermo] = useState('');
  const [pontos, setPontos] = useState<PontoTuristico[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscaRealizada, setBuscaRealizada] = useState(false);
  
  // Estados de paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalItens, setTotalItens] = useState(0);
  const pageSize = 5; // Itens por página

  // Função reutilizável para carregar pontos
  const carregarPontos = async (termoBusca: string = '', pagina: number = 1, mostrarErro: boolean = true) => {
    setCarregando(true);
    try {
      const resultado = await buscarPontosTuristicos(termoBusca, pagina, pageSize);
      
      // Verifica se a API retornou objeto paginado ou array direto
      if (Array.isArray(resultado)) {
        // API retornou array direto (sem paginação no backend)
        setPontos(resultado);
        setTotalPaginas(1);
        setTotalItens(resultado.length);
        setPaginaAtual(1);
      } else {
        // API retornou objeto paginado
        setPontos(resultado.items || []);
        setTotalPaginas(resultado.totalPages || 0);
        setTotalItens(resultado.totalItems || 0);
        setPaginaAtual(resultado.currentPage || 1);
      }
      
      setBuscaRealizada(true);
    } catch (error) {
      console.error('Erro ao buscar:', error);
      if (mostrarErro) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao buscar pontos turísticos. Verifique sua conexão e tente novamente.',
          confirmButtonColor: '#3498db'
        });
      }
      setPontos([]);
      setTotalPaginas(0);
      setTotalItens(0);
      setBuscaRealizada(true);
    } finally {
      setCarregando(false);
    }
  };

  // Busca automática ao carregar a página
  useEffect(() => {
    carregarPontos('', 1, false);
  }, []);

  const handleBuscar = async () => {
    setPaginaAtual(1); // Resetar para primeira página ao fazer nova busca
    carregarPontos(termo, 1);
  };

  const handleMudarPagina = (novaPagina: number) => {
    carregarPontos(termo, novaPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave para o topo
  };

  const handleCadastrar = () => {
    navigate('/cadastro');
  };

  const handleEditar = (id: number) => {
    navigate(`/cadastro/${id}`);
  };

  const handleExcluir = async (id: number) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Confirmar exclusão',
      text: 'Tem certeza que deseja excluir este ponto turístico?',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#95a5a6'
    });

    if (result.isConfirmed) {
      try {
        await excluirPontoTuristico(id);
        await Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'Ponto turístico excluído com sucesso',
          confirmButtonColor: '#3498db',
          timer: 2000
        });
        // Recarregar a página atual após exclusão
        carregarPontos(termo, paginaAtual);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao excluir ponto turístico. Tente novamente.',
          confirmButtonColor: '#3498db'
        });
      }
    }
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
        onEditar={handleEditar}
        onExcluir={handleExcluir}
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        totalItens={totalItens}
        onMudarPagina={handleMudarPagina}
      />
    </div>
  );
};

export default Pesquisa;
