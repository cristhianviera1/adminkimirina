import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Novedad } from './../models/novedad';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {

  selectedNovedad: Novedad;
  novedades: Novedad[];
  url = '/novedades';

  constructor(private httpClient: HttpClient) {
    this.selectedNovedad = new Novedad();
  }

  getNovedades() {
    return this.httpClient.get(environment.API_URL + this.url);
  }

  postNovedad(titulo: string, descripcion: string, link: string, image: File) {
    var formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("link", link);
    formData.append("image", image);

    return this.httpClient.post<Novedad>(environment.API_URL + this.url, formData);
  }

  putNovedad(_id: string, titulo: string, descripcion: string, link: string, image: File) {
    var formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("link", link);
    formData.append("image", image);

    return this.httpClient.put<Novedad>(environment.API_URL + this.url + `/${_id}`, formData);
  }

  deleteNovedad(_id: string) {
    return this.httpClient.delete(environment.API_URL + this.url + `/${_id}`);
  }
}
