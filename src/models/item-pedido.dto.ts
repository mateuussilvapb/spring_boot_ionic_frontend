import { RefDTO } from "./ref.dto";
import { ProdutoDTO } from "./produto.dto";
// ================================================= //
export interface ItemPedidoDTO {
  quantidade: number;
  produto: RefDTO;
}
