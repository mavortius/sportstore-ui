import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductSelectionComponent} from './store/product-selection.component';
import {CartDetailComponent} from './store/cart-detail.component';

const routes: Routes = [
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
