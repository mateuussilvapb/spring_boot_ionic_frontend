import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";

// ================================================= //
@Injectable()
export class LoadingUtilsService {
  // ================================================= //
  constructor(public loadingCtrl: LoadingController) {}
  // ================================================= //
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Por favor, aguarde...",
    });
    return loader;
  }
}
