import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ModelModule} from './models/model.module';
import {ProductTableComponent} from './structure/product-table.component';
import {CategoryFilterComponent} from './structure/category-filter.component';
import {ProductDetailComponent} from './structure/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    CategoryFilterComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
