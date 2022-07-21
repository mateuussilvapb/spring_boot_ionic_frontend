import { CartService } from "./../../services/domain/cart.service";
import { ProdutoService } from "./../../services/domain/produto.service";
import { CartItem } from "./../../models/cart-item";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { API_CONFIG } from "../../config/api.config";

// ================================================= //
@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html",
})
export class CartPage {
  // ================================================= //
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService
  ) {}
  // ================================================= //
  ionViewDidLoad() {
    let cart: Cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }
  // ================================================= //
  items: CartItem[];
  // ================================================= //
  loadImageUrls() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id).subscribe(
        (response) => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        (error) => {}
      );
    }
  }

  // ================================================= //
  removeItem(produto: ProdutoDTO) {
    let cart: Cart = this.cartService.removeProduto(produto);
    this.items = cart.items;
  }

  // ================================================= //
  increaseQuantity(produto: ProdutoDTO) {
    let cart: Cart = this.cartService.increaseQuantity(produto);
    this.items = cart.items;
  }

  // ================================================= //
  decreaseQuantity(produto: ProdutoDTO) {
    let cart: Cart = this.cartService.decreaseQuantity(produto);
    this.items = cart.items;
  }

  // ================================================= //
  total(): number {
    return this.cartService.total();
  }

  // ================================================= //
  goOn() {
    this.navCtrl.setRoot("CategoriasPage");
  }
  
  // ================================================= //
  checkout() {
    this.navCtrl.push("PickAddressPage");
  }
}
