import { CepDTO } from "./../models/cep.dto";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// ================================================= //
@Injectable()
export class CepService {
  // ================================================= //
  constructor(public http: HttpClient) {}
  // ================================================= //
  findByCep(cep: string): Observable<CepDTO> {
    return this.http.get<CepDTO>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
