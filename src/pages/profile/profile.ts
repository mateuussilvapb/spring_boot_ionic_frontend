import { LoadingUtilsService } from "./../../utils/loading.utils";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { API_CONFIG } from "./../../config/api.config";
import { ClienteService } from "./../../services/domain/cliente.service";
import { ClienteDTO } from "./../../models/cliente.dto";
import { StorageService } from "./../../services/storage.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AlertUtilsService } from "../../utils/alert.utils";

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
    public alertUtils: AlertUtilsService,
    public camera: Camera,
    public loadingCtrl: LoadingUtilsService
  ) {}
  // ================================================= //
  ionViewDidLoad() {
    this.loadData();
  }
  // ================================================= //
  cliente: ClienteDTO;
  // ================================================= //
  picture: string;
  // ================================================= //
  cameraOn: boolean = false;
  // ================================================= //
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(
      (response) => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      (error) => {}
    );
  }
  // ================================================= //
  getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      (err) => {
        this.cameraOn = false;
      }
    );
  }
  // ================================================= //
  getGalleryPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      (err) => {
        this.cameraOn = false;
      }
    );
  }
  // ================================================= //
  sendPicture() {
    let loader = this.loadingCtrl.presentLoading();
    loader.present();
    this.clienteService.uploadPicture(this.picture).subscribe(
      (response) => {
        this.picture = null;
        this.loadData();
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
      }
    );
  }
  // ================================================= //
  loadData() {
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
              "Não foi possível recuperar as informações do usuário. \nAcesse sua conta e tente novamente."
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
  cancel() {
    this.picture = null;
  }
}
