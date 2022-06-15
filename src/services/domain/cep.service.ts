import { API_CONFIG } from "./../../config/api.config";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CepDTO } from "../../models/cep.dto";

// ================================================= //
@Injectable()
export class CepService {
  // ================================================= //
  constructor(public http: HttpClient) {}
  // ================================================= //
  findEndereco(cep: string): Observable<CepDTO> {
    return this.http.get<CepDTO>(`${API_CONFIG.cepUrl}/${cep}/json`);
  }
}
