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
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`
    );
  }
}
