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
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  // ================================================= //
  items: ProdutoDTO[];
  // ================================================= //
  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        nome: "Mouse",
        preco: 80.99,
      },
      {
        id: "2",
        nome: "Teclado",
        preco: 100.0,
      },
    ];
  }
}
