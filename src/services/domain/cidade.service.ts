import { CidadeModel } from "./../../models/cidade.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";

// ================================================= //
@Injectable()
export class CidadeService {
  // ================================================= //
  constructor(public http: HttpClient) {}

  // ================================================= //
  findAll(estado_id: string): Observable<CidadeDTO[]> {
    return this.http.get<CidadeDTO[]>(
      `${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`
    );
  }
  // ================================================= //
  insert(obj: CidadeModel) {
    return this.http.post(`${API_CONFIG.baseUrl}/cidade`, obj, {
      observe: "response",
      responseType: "json",
    });
  }
}
