import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";

// ================================================= //
@Injectable()
export class EstadoService {
  // ================================================= //
  constructor(public http: HttpClient) {}

  // ================================================= //
  findAll(): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    );
  }
  // ================================================= //
  findOneBySigla(sigla: string): Observable<EstadoDTO> {
    return this.http.get<EstadoDTO>(
      `${API_CONFIG.cidadesEstadosUrl}/estados/${sigla}`
    );
  }
}
