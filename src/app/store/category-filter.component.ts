import {Component} from '@angular/core';

import {Repository} from '../models/repository';

@Component({
  selector: 'app-store-category-filter',
  templateUrl: 'category-filter.component.html'
})
export class CategoryFilterComponent {

  constructor(private repo: Repository) {
  }
}
