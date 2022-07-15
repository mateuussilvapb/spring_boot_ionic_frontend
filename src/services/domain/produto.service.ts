import { ProdutoDTO } from "./../../models/produto.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "./../../config/api.config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// ================================================= //
@Injectable()
export class ProdutoService {
  // ================================================= //
  constructor(public http: HttpClient) {}

  // ================================================= //
  findById(produto_id: string) {
    return this.http.get<ProdutoDTO>(
      `${API_CONFIG.baseUrl}/produtos/${produto_id}`
    );
  }

  // ================================================= //
  findByCategoria(categoria_id: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`
    );
  }

  // ================================================= //
  getSmallImageFromBucket(produto_id: string): Observable<any> {
    return this.http.get(
      `${API_CONFIG.bucketBaseUrl}/prod${produto_id}-small.jpg`,
      { responseType: "blob" }
    );
  }

  // ================================================= //
  getImageFromBucket(produto_id: string): Observable<any> {
    return this.http.get(`${API_CONFIG.bucketBaseUrl}/prod${produto_id}.jpg`, {
      responseType: "blob",
    });
  }
}
