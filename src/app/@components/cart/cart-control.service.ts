import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartControlService {
  private items = new BehaviorSubject<any[]>([]);
  cartItems = this.items.asObservable();

  constructor() {
    const storedItems = window.localStorage.getItem('items');
    if (storedItems) {
      this.items.next(JSON.parse(storedItems));
    }
  }

  getCartItems(): Observable<any[]> {
    return this.cartItems;
  }

  addCartItem(item: any): void {
    const currentItems = this.items.getValue();
    const updatedItems = [...currentItems, item]; // Ensure updatedItems is an array
    this.items.next(updatedItems);

    window.localStorage.setItem('items', JSON.stringify(updatedItems)); // Save the updated items array
  }

  updateCartItems(items: any[]): void {
    this.items.next(items);
    window.localStorage.setItem('items', JSON.stringify(items)); // Save the updated items array
  }
}
