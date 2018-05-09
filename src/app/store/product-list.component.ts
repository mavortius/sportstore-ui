import {Component} from '@angular/core';

import {Repository} from '../models/repository';
import {Product} from '../models/product.model';

@Component({
  selector: 'app-store-product-list',
  templateUrl: 'product-list.component.html'
})
export class ProductListComponent {

  constructor(private repo: Repository) {
  }

  get products(): Product[] {
    return this.repo.products;
  }
}
