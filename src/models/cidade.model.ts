import { EstadoDTO } from "./estado.dto";
// ================================================= //
export interface CidadeModel {
  id?: string;
  nome: string;
  estado: EstadoDTO;
}
