import { API_CONFIG } from "./../../config/api.config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { CidadeDTO } from "../../models/cidade.dto";

// ================================================= //
@Injectable()
export class CidadeService {
  // ================================================= //
  constructor(public http: HttpClient) {}

  // ================================================= //
  findAll(estadoId: string): Observable<CidadeDTO[]> {
    return this.http.get<CidadeDTO[]>(
      `${API_CONFIG.cidadesEstadosUrl}/estados/${estadoId}/municipios`
    );
  }

  // ================================================= //
  findCidadeByNome(cidade: string): Observable<CidadeDTO> {
    return this.http.get<CidadeDTO>(
      `${API_CONFIG.cidadesEstadosUrl}/municipios/${cidade}`
    );
  }
}
