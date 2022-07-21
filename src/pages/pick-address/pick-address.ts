import { CartService } from "./../../services/domain/cart.service";
import { PedidoDTO } from "./../../models/pedido.dto";
import { StorageService } from "./../../services/storage.service";
import { ClienteService } from "./../../services/domain/cliente.service";
import { EnderecoDTO } from "./../../models/endereco.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

// ================================================= //
@IonicPage()
@Component({
  selector: "page-pick-address",
  templateUrl: "pick-address.html",
})
export class PickAddressPage {
  // ================================================= //
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService
  ) {}
  // ================================================= //
  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.items = response["enderecos"];
          let cart = this.cartService.getCart();
          this.pedido = {
            cliente: {
              id: response["id"],
            },
            enderecoDeEntrega: {
              id: null,
            },
            pagamento: null,
            itens: cart.items.map((item) => {
              return {
                quantidade: item.quantidade,
                produto: { id: item.produto.id },
              };
            }),
          };
        },
        (error) => {
          if (error.status) {
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
    this.items = [];
  }
  // ================================================= //
  items: EnderecoDTO[];
  // ================================================= //
  pedido: PedidoDTO;
  // ================================================= //
  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: item.id };
    console.log(this.pedido);
  }
}
