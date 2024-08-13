// src/app/services/cart.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Set<number> = new Set(); // Using Set to store unique product IDs

  addToCart(productId: number): void {
    this.cart.add(productId);
  }

  getCartCount(): number {
    return this.cart.size;
  }
}
