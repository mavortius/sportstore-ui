import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {CartSummaryComponent} from './cart-summary.component';
import {CategoryFilterComponent} from './category-filter.component';
import {PaginationComponent} from './pagination.component';
import {ProductListComponent} from './product-list.component';
import {RatingsComponent} from './ratings.component';
import {ProductSelectionComponent} from './product-selection.component';

@NgModule({
  declarations: [
    CartSummaryComponent,
    CategoryFilterComponent,
    PaginationComponent,
    ProductListComponent,
    RatingsComponent,
    ProductSelectionComponent
  ],
  imports: [BrowserModule],
  exports: [ProductSelectionComponent]
})
export class StoreModule {
}
