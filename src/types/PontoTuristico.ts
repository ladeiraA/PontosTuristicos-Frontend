export interface PontoTuristico {
  id: number;
  nome: string;
  descricao: string;
  referencia: string;
  cidade: string;
  estado: string;
  dataInclusao: string;
}

export interface NovoPontoTuristico {
  nome: string;
  descricao: string;
  referencia: string;
  cidade: string;
  estado: string;
}
