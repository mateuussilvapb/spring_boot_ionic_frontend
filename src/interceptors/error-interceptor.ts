import { FieldMessage } from "./../models/fieldmessage";
import { StorageService } from "./../services/storage.service";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable } from "rxjs/Rx"; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from "ionic-angular";

// ================================================= //
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // ================================================= //
  constructor(
    public storage: StorageService,
    public alertController: AlertController
  ) {}

  // ================================================= //
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).catch((error, caught) => {
      let errorObj = error;
      if (errorObj.error) {
        errorObj = errorObj.error;
      }
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }
      console.log("Erro detectado pelo interceptor:");
      console.log(errorObj);
      switch (errorObj.status) {
        case 401:
          this.handle401();
          break;
        case 403:
          this.handle403();
          break;
        case 422:
          this.handle422(errorObj);
          break;
        default:
          this.handleDefaultError(errorObj);
      }
      return Observable.throw(errorObj);
    }) as any;
  }
  // ================================================= //
  handle401() {
    let alert = this.alertController.create({
      title: "Erro 401: falha de autenticação",
      message: "Email ou senha incorretos",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "OK",
        },
      ],
    });
    alert.present();
  }

  // ================================================= //
  handle403() {
    this.storage.setLocalUser(null);
  }

  // ================================================= //
  handle422(errorObj) {
    let alert = this.alertController.create({
      title: "Erro 422: validação",
      message: this.listErrors(errorObj.errors),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "OK",
        },
      ],
    });
    alert.present();
  }

  listErrors(errors: FieldMessage[]): string {
    let s: string = "";
    for (const error of errors) {
      s =
        s +
        "<p><strong>" +
        error.fieldName +
        "</strong>: " +
        error.message +
        "</p>";
    }
    return s;
  }

  // ================================================= //
  handleDefaultError(errorObj) {
    let alert = this.alertController.create({
      title: "Erro " + errorObj.status + ": " + errorObj.error,
      message: errorObj.message,
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

// ================================================= //
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
