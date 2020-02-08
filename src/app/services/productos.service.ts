import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  selectedProducto: Producto;
  productos: Producto[];
  url = '/productos';

  constructor(private httpClient: HttpClient) {
    this.selectedProducto = new Producto();
   }

  getProductos() {
    return this.httpClient.get(environment.API_URL + this.url);
  }

  postProducto(producto: Producto) {
    return this.httpClient.post(environment.API_URL + this.url, producto);
  }

  putProducto(producto: Producto) {
    return this.httpClient.put(environment.API_URL + this.url + `/${producto._id}`, producto);
  }

  deleteProducto(_id: string) {
    return this.httpClient.delete(environment.API_URL + this.url + `/${_id}`);
  }


}
