import {Component} from '@angular/core';

import {Repository} from '../models/repository';

@Component({
  selector: 'app-store-category-filter',
  templateUrl: 'category-filter.component.html'
})
export class CategoryFilterComponent {

  constructor(private repo: Repository) {
  }

  get categories(): string[] {
    return this.repo.categories;
  }

  get currentCategory(): string {
    return this.repo.filter.category;
  }

  setCurrentCategory(newCategory: string) {
    this.repo.filter.category = newCategory;
    this.repo.getProducts();
  }
}
