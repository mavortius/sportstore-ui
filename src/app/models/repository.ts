import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {catchError} from 'rxjs/operators';

import {SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';

import {environment} from '../../environments/environment';
import {Product} from './product.model';
import {Supplier} from './supplier.model';
import {Filter, Pagination} from './config-classes.repository';
import {Order, OrderConfirmation} from './order.model';
import {Observable} from 'rxjs/Observable';
import {_throw} from 'rxjs/observable/throw';
import {ErrorHandlerService, ValidationError} from '../error-handler.service';

const productsUrl = 'products';
const suppliersUrl = 'suppliers';
const ordersUrl = 'orders';

@Injectable()
export class Repository {
  product: Product;
  products: Product[];
  suppliers: Supplier[] = [];
  categories: string[] = [];
  orders: Order[] = [];

  private filterObject = new Filter();
  private paginationObject = new Pagination();

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
              private http: HttpClient, private errorHandler: ErrorHandlerService) {
    // this.filter.category = 'soccer';
    this.filter.related = true;
    this.getProducts();
  }

  getProduct(id: number) {
    this.http.get<Product>(`${environment.apiUrl}/${productsUrl}/${id}`)
      .pipe(catchError(this.handleError))
      .subscribe(response => this.product = response);
  }

  getProducts() {
    let url = `${environment.apiUrl}/${productsUrl}?related=${this.filter.related}`;

    if (this.filter.category) {
      url += `&category=${this.filter.category}`;
    }

    if (this.filter.search) {
      url += `&search=${this.filter.search}`;
    }

    url += '&metadata=true';

    this.http.get<any>(url)
      .subscribe(response => {
          this.products = response.data;
          this.categories = response.categories;
          this.pagination.currentPage = 1;
        },
        error => console.error(error));
  }

  getSuppliers() {
    this.http.get<Supplier[]>(`${environment.apiUrl}/${suppliersUrl}`)
      .subscribe(response => this.suppliers = response,
        error => console.error(error));
  }

  createProduct(prod: Product) {
    const data = {
      name: prod.name, category: prod.category,
      description: prod.description, price: prod.price,
      supplier: prod.supplier ? prod.supplier.supplierId : 0
    };

    this.http.post<number>(`${environment.apiUrl}/${productsUrl}`, data)
      .subscribe(response => {
        prod.productId = response;
        this.products.push(prod);
      }, (errorResponse: HttpErrorResponse) => {
        this.errorHandler.handleError(this.handleError(errorResponse));
      });
  }

  private handleError(errorResponse: HttpErrorResponse): any {
    if (errorResponse.status === 400) {
      const jsonData = errorResponse.error;
      console.log(jsonData);
      const messages = Object.getOwnPropertyNames(jsonData)
        .map(p => jsonData[p]);
      console.log(messages);
      return new ValidationError(messages);
    }
    return new Error('Network Error');
  }

  createProductAndSupplier(prod: Product, supp: Supplier) {
    const data = {
      name: supp.name, city: supp.city, state: supp.state
    };

    this.http.post<number>(`${environment.apiUrl}/${suppliersUrl}`, data)
      .subscribe(response => {
        supp.supplierId = response;
        prod.supplier = supp;
        this.suppliers.push(supp);

        if (prod) {
          this.createProduct(prod);
        }
      }, error => console.error(error));
  }

  replaceProduct(prod: Product) {
    const data = {
      name: prod.name, category: prod.category, description: prod.description, price: prod.price,
      supplier: prod.supplier ? prod.supplier.supplierId : 0
    };

    this.http.put(`${environment.apiUrl}/${productsUrl}/${prod.productId}`, data)
      .subscribe(() => this.getProducts(),
        error => console.error(error));
  }

  replaceSupplier(supp: Supplier) {
    const data = {
      name: supp.name, city: supp.city, state: supp.state
    };

    this.http.put(`${environment.apiUrl}/${suppliersUrl}/${supp.supplierId}`, data)
      .subscribe(() => this.getProducts(),
        error => console.error(error));
  }

  updateProduct(id: number, changes: Map<string, any>) {
    const patch = [];

    changes.forEach((value, key) => patch.push({op: 'replace', path: key, value: value}));

    this.http.patch(`${environment.apiUrl}/${productsUrl}/${id}`, patch)
      .subscribe(() => this.getProducts(),
        error => console.error(error));
  }

  deleteProduct(id: number) {
    this.http.delete(`${environment.apiUrl}/${productsUrl}/${id}`)
      .subscribe(() => this.getProducts(),
        error => console.error(error));
  }

  deleteSupplier(id: number) {
    this.http.delete(`${environment.apiUrl}/${suppliersUrl}/${id}`)
      .subscribe(() => {
        this.getProducts();
        this.getSuppliers();
      }, error => console.error(error));
  }

  getOrders() {
    this.http.get<Order[]>(`${environment.apiUrl}/${ordersUrl}`)
      .subscribe(response => this.orders = response);
  }

  createOrder(order: Order) {
    this.http.post<OrderConfirmation>(`${environment.apiUrl}/${ordersUrl}`, {
      name: order.name,
      address: order.address,
      payment: order.payment,
      products: order.products
    })
      .subscribe(response => {
        order.orderConfirmation = response;
        order.clear();
      }, error => console.error(error));
  }

  shipOrder(order: Order) {
    this.http.post(`${environment.apiUrl}/${ordersUrl}/${order.orderId}`, {})

      .subscribe(() => this.getOrders(), error => console.error(error));
  }

  get filter(): Filter {
    return this.filterObject;
  }

  get pagination(): Pagination {
    return this.paginationObject;
  }

  storeSessionData(dataType: string, data: any) {
    this.storage.set(dataType, data);
  }

  getSessionData(dataType: string): any {
    return this.storage.get(dataType);
  }
}
