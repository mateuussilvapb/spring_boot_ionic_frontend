import { CartService } from "./../../services/domain/cart.service";
import { ProdutoService } from "./../../services/domain/produto.service";
import { ProdutoDTO } from "./../../models/produto.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { API_CONFIG } from "../../config/api.config";
import { LoadingUtilsService } from "../../utils/loading.utils";

// ================================================= //
@IonicPage()
@Component({
  selector: "page-produto-detail",
  templateUrl: "produto-detail.html",
})
export class ProdutoDetailPage {
  // ================================================= //
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService,
    public loadingCtrl: LoadingUtilsService
  ) {}
  // ================================================= //
  ionViewDidLoad() {
    let produto_id = this.navParams.get("produto_id");
    let loader = this.loadingCtrl.presentLoading();
    loader.present();
    this.produtoService.findById(produto_id).subscribe(
      (response) => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      (error) => {
        loader.dismiss();
      }
    );
    loader.dismiss();
  }
  // ================================================= //
  item: ProdutoDTO;
  // ================================================= //
  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id).subscribe(
      (response) => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      (error) => {}
    );
  }
  // ================================================= //
  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot("CartPage");
  }
}
