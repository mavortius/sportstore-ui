import {Component} from '@angular/core';
import {Cart} from '../models/cart.model';

@Component({
  selector: 'app-store-cart-summary',
  templateUrl: 'cart-summary.component.html'
})
export class CartSummaryComponent {

  constructor(private cart: Cart) {
  }

  get itemCount(): number {
    return this.cart.itemCount;
  }

  get totalPrice(): number {
    return this.cart.totalPrice;
  }
}
