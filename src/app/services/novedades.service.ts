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

  postNovedad(novedad: Novedad) {
    return this.httpClient.post(environment.API_URL + this.url, novedad);
  }

  putNovedad(novedad: Novedad) {
    return this.httpClient.put(environment.API_URL + this.url + `/${novedad._id}`, novedad);
  }

  deleteNovedad(_id: string) {
    return this.httpClient.delete(environment.API_URL + this.url+ `/${_id}`);
  }
}
