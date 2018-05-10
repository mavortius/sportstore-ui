import {Component} from '@angular/core';

import {Repository} from './models/repository';
import {Product} from './models/product.model';
import {ErrorHandlerService} from './error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private lastError: string[];

  constructor(private repo: Repository,
              errorHandler: ErrorHandlerService) {
    errorHandler.errors.subscribe(error => this.lastError = error);
  }

  get error(): string[] {
    return this.lastError;
  }

  clearError() {
    this.lastError = null;
  }

  get product(): Product {
    return this.repo.product;
  }

  get products(): Product[] {
    return this.repo.products;
  }
}
