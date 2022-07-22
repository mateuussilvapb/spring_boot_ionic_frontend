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
  /*
  Inicializado vazio para que funcione o infinite scroll
  */
  items: ProdutoDTO[] = [];
  // ================================================= //
  page: number = 0;
  // ================================================= //
  ionViewDidLoad() {
    this.loadData();
  }
  // ================================================= //
  loadImageUrls(start: number, end: number) {
    for (let i = start; i < end; i++) {
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
    this.produtoService.findByCategoria(categoria_id, this.page, 10).subscribe(
      (response) => {
        let start = this.items.length;
        /*
        Implementado com o .concat para que funcione o infinite scroll
         */
        this.items = this.items.concat(response["content"]);
        let end = this.items.length - 1;
        this.loadImageUrls(start, end);
        console.log(this.page);
        console.log(this.items);
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
      }
    );
  }
  // ================================================= //
  doRefresh(event) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }
  // ================================================= //
  doInfinite(event) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }
}
