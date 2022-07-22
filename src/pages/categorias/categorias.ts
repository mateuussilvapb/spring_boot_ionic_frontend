import { API_CONFIG } from "./../../config/api.config";
import { CategoriaDTO } from "./../../models/categoria.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CategoriaService } from "../../services/domain/categoria.service";
import { LoadingUtilsService } from "../../utils/loading.utils";

// ================================================= //
@IonicPage()
@Component({
  selector: "page-categorias",
  templateUrl: "categorias.html",
})
// ================================================= //
export class CategoriasPage {
  // ================================================= //
  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  // ================================================= //
  items: CategoriaDTO[];
  // ================================================= //
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public loadingCtrl: LoadingUtilsService
  ) {}

  // ================================================= //
  ionViewDidLoad() {
    let loader = this.loadingCtrl.presentLoading();
    loader.present();
    this.categoriaService.findAll().subscribe(
      (response) => {
        this.items = response;
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
      }
    );
  }

  // ================================================= //
  showProdutos(categoria_id: string) {
    this.navCtrl.push("ProdutosPage", { categoria_id: categoria_id });
  }
}
