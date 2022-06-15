import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";
import { CidadeDTO } from "../../models/cidade.dto";

// ================================================= //
@Injectable()
export class EstadoService {
  // ================================================= //
  constructor(public http: HttpClient) {}

  // ================================================= //
  findAll(): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
  }

  // ================================================= //
  findOneBySigla(sigla: String): Observable<EstadoDTO> {
    return this.http.get<EstadoDTO>(`${API_CONFIG.baseUrl}/estados/bySigla/${sigla}`);
  }

  // ================================================= //
  findOneById(estadoId: String): Observable<EstadoDTO> {
    return this.http.get<EstadoDTO>(`${API_CONFIG.baseUrl}/estados/byId/${estadoId}`);
  }

  // ================================================= //
  updateCidadesDoEstado(estadoId: string, cidadeId: string) {
    return this.http.put(
      `${API_CONFIG.baseUrl}/estados/${estadoId}/${cidadeId}`,
      null
    );
  }

  // ================================================= //
  findAllCidades(estadoId: string): Observable<CidadeDTO[]> {
    return this.http.get<CidadeDTO[]>(
      `${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`
    );
  }
}
