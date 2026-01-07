import axios from 'axios';
import { PontoTuristico, NovoPontoTuristico } from '../types/PontoTuristico';

// Configuração da URL base da API
const API_BASE_URL = 'https://localhost:7165/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para buscar pontos turísticos
export const buscarPontosTuristicos = async (termo: string = ''): Promise<PontoTuristico[]> => {
  try {
    const response = await api.get<PontoTuristico[]>('/PontosTuristicos', {
      params: { termo },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pontos turísticos:', error);
    throw error;
  }
};

// Função para cadastrar um novo ponto turístico
export const cadastrarPontoTuristico = async (ponto: NovoPontoTuristico): Promise<PontoTuristico> => {
  try {
    const response = await api.post<PontoTuristico>('/PontosTuristicos', ponto);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar ponto turístico:', error);
    throw error;
  }
};
