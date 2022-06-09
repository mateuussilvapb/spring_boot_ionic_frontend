import { EstadoDTO } from "./estado.dto";
// ================================================= //
export interface CidadeDTO {
  id: string;
  nome: string;
  microrregiao: {
    id: string;
    nome: string;
    mesorregiao: {
      id: string;
      nome: string;
      UF: EstadoDTO;
    };
  };
}
