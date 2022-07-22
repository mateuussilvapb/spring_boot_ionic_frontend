import { AlertUtilsService } from "./../../utils/alert.utils";
import { API_CONFIG } from "./../../config/api.config";
import { ClienteService } from "./../../services/domain/cliente.service";
import { ClienteDTO } from "./../../models/cliente.dto";
import { StorageService } from "./../../services/storage.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

// ================================================= //
@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
// ================================================= //
export class ProfilePage {
  // ================================================= //
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public alertUtils: AlertUtilsService
  ) {}
  // ================================================= //
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
        },
        (error) => {
          if (error.status) {
            this.alertUtils.showAlert(
              "Erro ao recuperar usuário!",
              "Não foi possível recuperar as informações do usuário. \nAcesse sua conta e tente novamente.",
              false
            );
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }
  // ================================================= //
  cliente: ClienteDTO;
  // ================================================= //
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(
      (response) => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      (error) => {}
    );
  }
}
