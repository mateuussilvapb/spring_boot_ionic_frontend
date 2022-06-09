// ================================================= //
export interface EstadoDTO {
  id: string;
  sigla: string;
  nome: string;
  regiao: {
    id: string;
    sigla: string;
    nome: string;
  };
}
