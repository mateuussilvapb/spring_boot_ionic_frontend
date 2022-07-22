import { Injectable } from "@angular/core";
import { AlertController, NavController } from "ionic-angular";

// ================================================= //
@Injectable()
export class AlertUtilsService {
  // ================================================= //
  constructor(
    public navCtrl: NavController,
    public alertController: AlertController
  ) {}
  // ================================================= //
  showAlert(title: string, message: string, navigate: boolean) {
    let alert;
    if (navigate) {
      alert = this.alertController.create({
        title: title,
        message: message,
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.navCtrl.pop();
            },
          },
        ],
      });
    } else {
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
    }
    alert.present();
  }
}
