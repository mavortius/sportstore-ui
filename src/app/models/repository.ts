import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Product} from './product.model';
import {Supplier} from './supplier.model';
import {Filter} from './config-classes.repository';

const productsUrl = 'products';
const suppliersUrl = 'suppliers';

@Injectable()
export class Repository {
  product: Product;
  products: Product[];
  suppliers: Supplier[] = [];

  private filterObject = new Filter();

  constructor(private http: HttpClient) {
    // this.filter.category = 'soccer';
    this.filter.related = true;
    this.getProducts();
  }

  getProduct(id: number) {
    this.http.get<Product>(`${environment.apiUrl}/${productsUrl}/${id}`)
      .subscribe(response => this.product = response,
        error => console.error(error));
  }

  getProducts() {
    let url = `${environment.apiUrl}/${productsUrl}?related=${this.filter.related}`;

    if (this.filter.category) {
      url += `&category=${this.filter.category}`;
    }

    if (this.filter.search) {
      url += `&search=${this.filter.search}`;
    }

    this.http.get<Product[]>(url)
      .subscribe(response => this.products = response,
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
      }, error => console.error(error));
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

  get filter(): Filter {
    return this.filterObject;
  }
}
