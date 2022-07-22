import { LoadingUtilsService } from "./../../utils/loading.utils";
import { API_CONFIG } from "./../../config/api.config";
import { ProdutoService } from "./../../services/domain/produto.service";
import { ProdutoDTO } from "./../../models/produto.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

// ================================================= //
@IonicPage()
@Component({
  selector: "page-produtos",
  templateUrl: "produtos.html",
})
export class ProdutosPage {
  // ================================================= //
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingUtilsService
  ) {}
  // ================================================= //
  items: ProdutoDTO[];
  // ================================================= //
  ionViewDidLoad() {
    this.loadData();
  }
  // ================================================= //
  loadImageUrls() {
    for (let i = 0; i < this.items.length; i++) {
      let item: ProdutoDTO = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(
        (response) => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        (error) => {}
      );
    }
  }
  // ================================================= //
  showDetail(produto_id: string) {
    this.navCtrl.push("ProdutoDetailPage", { produto_id: produto_id });
  }
  // ================================================= //
  loadData() {
    let categoria_id = this.navParams.get("categoria_id");
    let loader = this.loadingCtrl.presentLoading();
    loader.present();
    this.produtoService.findByCategoria(categoria_id).subscribe(
      (response) => {
        this.items = response["content"];
        this.loadImageUrls();
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
      }
    );
  }
  // ================================================= //
  doRefresh(event) {
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }
}
