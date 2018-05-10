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
import {CheckoutDetailsComponent} from './checkout/checkout-details.component';
import {CheckoutPaymentComponent} from './checkout/checkout-payment.component';
import {CheckoutSummaryComponent} from './checkout/checkout-summary.component';
import {OrderConfirmationComponent} from './checkout/order-confirmation.component';

@NgModule({
  declarations: [
    CartSummaryComponent,
    CategoryFilterComponent,
    PaginationComponent,
    ProductListComponent,
    RatingsComponent,
    ProductSelectionComponent,
    CartDetailComponent,
    CheckoutDetailsComponent,
    CheckoutPaymentComponent,
    CheckoutSummaryComponent,
    OrderConfirmationComponent
  ],
  imports: [BrowserModule, RouterModule, FormsModule],
  exports: [ProductSelectionComponent]
})
export class StoreModule {
}
