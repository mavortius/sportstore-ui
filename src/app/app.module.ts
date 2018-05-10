import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {StorageServiceModule} from 'ngx-webstorage-service';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ModelModule} from './models/model.module';
import {StoreModule} from './store/store-module';
import {AdminModule} from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModelModule,
    StoreModule,
    StorageServiceModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
