import {Component} from '@angular/core';

import {Repository} from '../models/repository';
import {Product} from '../models/product.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent {

  constructor(private repo: Repository, router: Router, activeRoute: ActivatedRoute) {
    const id = Number.parseInt(activeRoute.snapshot.params['id']);

    if (id) {
      this.repo.getProduct(id);
    } else {
      router.navigateByUrl('/');
    }
  }

  get product(): Product {
    return this.repo.product;
  }
}
