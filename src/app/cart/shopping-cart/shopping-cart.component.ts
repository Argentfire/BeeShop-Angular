import { Component } from '@angular/core';
import { CartControlService } from '../cart-control.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  constructor(
    private cartService: CartControlService
  ) {

    debugger
  }
}
