import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private httpClient: HttpClient) { }

  getProductos(url: string){
    return this.httpClient.get(environment.API_URL + url);
  }

  postProductos(url: string, data: any){
    return this.httpClient.post(environment.API_URL + url, data);
  }

  putProductos(url: string, data: any){
    return this.httpClient.put(environment.API_URL + url, data);
  }

  deleteProductos(url: string){
    return this.httpClient.delete(environment.API_URL + url);
  }
}
