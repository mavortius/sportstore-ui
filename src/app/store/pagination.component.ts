import {Component} from '@angular/core';
import {Repository} from '../models/repository';

@Component({
  selector: 'app-store-pagination',
  templateUrl: 'pagination.component.html'
})
export class PaginationComponent {

  constructor(private repo: Repository) {
  }
}
