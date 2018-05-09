import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {CartSummaryComponent} from './cart-summary.component';
import {CategoryFilterComponent} from './category-filter.component';
import {PaginationComponent} from './pagination.component';
import {ProductListComponent} from './product-list.component';
import {RatingsComponent} from './ratings.component';
import {ProductSelectionComponent} from './product-selection.component';
import {CartDetailComponent} from './cart-detail.component';

@NgModule({
  declarations: [
    CartSummaryComponent,
    CategoryFilterComponent,
    PaginationComponent,
    ProductListComponent,
    RatingsComponent,
    ProductSelectionComponent,
    CartDetailComponent
  ],
  imports: [BrowserModule, RouterModule, FormsModule],
  exports: [ProductSelectionComponent]
})
export class StoreModule {
}
