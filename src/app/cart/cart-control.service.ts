import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartControlService {
  private items = new BehaviorSubject<any[]>([]);
  cartItems = this.items.asObservable();

  constructor() { }

  getCartItems(): any[] {
    return this.items.value;
  }
  addCartItem(item: any): void {
    let currentItems = this.items.value;
    const updatedItems = { ...currentItems, item };
    this.items.next(updatedItems);
  }

}
