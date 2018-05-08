import {Component} from '@angular/core';

import {Repository} from '../models/repository';
import {Product} from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent {

  constructor(private repo: Repository) {
  }

  get product(): Product {
    return this.repo.product;
  }
}
