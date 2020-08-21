import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct: Product;
  products: Product[] = [];
  url = '/products';


  constructor(private httpClient: HttpClient) {
    this.selectedProduct = new Product();
  }

  getProducts() {
    return this.httpClient.get(environment.API_URL + this.url);
  }

  postProduct(title: string, description: string, link: string, price: string, observations: string, image: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('price', price);
    formData.append('observations', observations);
    formData.append('image', image);

    return this.httpClient.post<Product>(environment.API_URL + this.url, formData, { reportProgress: true, observe: 'events'});
  }

  // tslint:disable-next-line: variable-name
  putProduct(_id: string, title: string, description: string, link: string, price: string, observations: string, image: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('price', price);
    formData.append('observations', observations);
    formData.append('image', image);
    return this.httpClient.put<Product>(environment.API_URL + this.url + `/${_id}`, formData);
  }

  // tslint:disable-next-line: variable-name
  deleteProduct(_id: string) {
    return this.httpClient.delete(environment.API_URL + this.url + `/${_id}`);
  }
}
