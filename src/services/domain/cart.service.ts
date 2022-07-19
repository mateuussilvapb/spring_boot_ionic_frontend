import { ProdutoDTO } from "./../../models/produto.dto";
import { Cart } from "./../../models/cart";
import { StorageService } from "./../storage.service";
import { Injectable } from "@angular/core";

// ================================================= //
@Injectable()
export class CartService {
  // ================================================= //
  constructor(public storageService: StorageService) {}

  // ================================================= //
  createOrClearCart(): Cart {
    let cart: Cart = { items: [] };
    this.storageService.setCart(cart);
    return cart;
  }

  // ================================================= //
  getCart(): Cart {
    let cart: Cart = this.storageService.getCart();
    if (cart == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  // ================================================= //
  addProduto(produto: ProdutoDTO): Cart {
    let cart: Cart = this.getCart();
    let position = cart.items.findIndex((x) => x.produto.id == produto.id);
    if (position == -1) {
      cart.items.push({ quantidade: 1, produto: produto });
    }
    this.storageService.setCart(cart);
    return cart;
  }
}
