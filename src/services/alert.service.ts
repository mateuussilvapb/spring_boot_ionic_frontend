import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

// ================================================= //
@Injectable()
export class AlertUtilsService {
  // ================================================= //
  constructor(public alertController: AlertController) {}
  // ================================================= //
  showAlert(title: string, message: string) {
    let alert;
    alert = this.alertController.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "OK",
        },
      ],
    });
    alert.present();
  }
}
