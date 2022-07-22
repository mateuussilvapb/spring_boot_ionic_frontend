import { PedidoService } from "./../../services/domain/pedido.service";
import { ClienteService } from "./../../services/domain/cliente.service";
import { EnderecoDTO } from "./../../models/endereco.dto";
import { ClienteDTO } from "./../../models/cliente.dto";
import { CartService } from "./../../services/domain/cart.service";
import { CartItem } from "./../../models/cart-item";
import { PedidoDTO } from "./../../models/pedido.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AlertUtilsService } from "../../utils/alert.utils";
import { LoadingUtilsService } from "../../utils/loading.utils";

// ================================================= //
@IonicPage()
@Component({
  selector: "page-order-confirmation",
  templateUrl: "order-confirmation.html",
})
export class OrderConfirmationPage {
  // ================================================= //
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService,
    public alertUtils: AlertUtilsService,
    public loadingCtrl: LoadingUtilsService
  ) {
    this.pedido = this.navParams.get("pedido");
  }
  // ================================================= //
  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id).subscribe(
      (response) => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(
          this.pedido.enderecoDeEntrega.id,
          response["enderecos"]
        );
      },
      (error) => {
        this.navCtrl.setRoot("HomePage");
      }
    );
  }
  // ================================================= //
  pedido: PedidoDTO;
  // ================================================= //
  cartItems: CartItem[];
  // ================================================= //
  cliente: ClienteDTO;
  // ================================================= //
  endereco: EnderecoDTO;
  // ================================================= //
  codPedido: string;
  // ================================================= //
  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex((x) => x.id == id);
    return list[position];
  }
  // ================================================= //
  total() {
    return this.cartService.total();
  }
  // ================================================= //
  back() {
    this.navCtrl.setRoot("CartPage");
  }
  // ================================================= //
  checkout() {
    let loader = this.loadingCtrl.presentLoading();
    loader.present();
    this.pedidoService.insert(this.pedido).subscribe(
      (response) => {
        this.cartService.createOrClearCart();
        this.codPedido = this.extractId(response.headers.get("location"));
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
        if (error.starus == 403) {
          this.alertUtils.showAlert(
            "Erro ao registrar pedido!",
            "Não foi possível registrar o seu pedido. \nVerifique se o pagamento foi gerado e tente novamente."
          );
          this.navCtrl.setRoot("HomePage");
        }
      }
    );
  }
  // ================================================= //
  home() {
    this.navCtrl.setRoot("CategoriasPage");
  }
  // ================================================= //
  private extractId(location: string): string {
    let position = location.lastIndexOf("/");
    return location.substring(position + 1, location.length);
  }
}
