import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductSelectionComponent} from './store/product-selection.component';

const routes: Routes = [
  {path: 'store', component: ProductSelectionComponent},
  {path: '', component: ProductSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
