import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductSelectionComponent} from './store/product-selection.component';
import {CartDetailComponent} from './store/cart-detail.component';
import {CheckoutDetailsComponent} from './store/checkout/checkout-details.component';
import {CheckoutPaymentComponent} from './store/checkout/checkout-payment.component';
import {CheckoutSummaryComponent} from './store/checkout/checkout-summary.component';
import {OrderConfirmationComponent} from './store/checkout/order-confirmation.component';
import {AdminComponent} from './admin/admin.component';
import {ProductAdminComponent} from './admin/product-admin.component';
import {OrderAdminComponent} from './admin/order-admin.component';
import {OverviewComponent} from './admin/overview.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      {path: 'products', component: ProductAdminComponent},
      {path: 'orders', component: OrderAdminComponent},
      {path: 'overview', component: OverviewComponent},
      {path: '', component: OverviewComponent}
    ]
  },
  {path: 'checkout/step1', component: CheckoutDetailsComponent},
  {path: 'checkout/step2', component: CheckoutPaymentComponent},
  {path: 'checkout/step3', component: CheckoutSummaryComponent},
  {path: 'checkout/confirmation', component: OrderConfirmationComponent},
  {path: 'cart', component: CartDetailComponent},
  {path: 'store', component: ProductSelectionComponent},
  {path: '', component: ProductSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
