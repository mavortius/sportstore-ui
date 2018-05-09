import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProductTableComponent} from './structure/product-table.component';
import {ProductDetailComponent} from './structure/product-detail.component';

const routes: Routes = [
  {path: 'table', component: ProductTableComponent},
  {path: 'detail/:id', component: ProductDetailComponent},
  {path: 'detail', component: ProductDetailComponent},
  {path: '', component: ProductTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
