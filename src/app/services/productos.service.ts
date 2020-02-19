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

  postProducto(titulo: string, descripcion: string, link: string, precio: string, observaciones: string, image: File) {
    var formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("link", link);
    formData.append("precio", precio);
    formData.append("observaciones", observaciones);
    formData.append("image", image);

    return this.httpClient.post<Producto>(environment.API_URL + this.url, formData);
  }

  putProducto(_id: string, titulo: string, descripcion: string, link: string, precio: string, observaciones: string, image: File) {
    var formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("link", link);
    formData.append("precio", precio);
    formData.append("observaciones", observaciones);
    formData.append("image", image);
    return this.httpClient.put<Producto>(environment.API_URL + this.url + `/${_id}`, formData);
  }

  deleteProducto(_id: string) {
    return this.httpClient.delete(environment.API_URL + this.url + `/${_id}`);
  }


}
