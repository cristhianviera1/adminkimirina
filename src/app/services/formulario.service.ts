import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Formulario } from './../models/formulario';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  selectedFormulario: Formulario;
  formularios: Formulario[];
  url = '/formulario';

  constructor(private httpClient: HttpClient) {
    this.selectedFormulario = new Formulario();
  }

  getFormularios() {
    return this.httpClient.get(environment.API_URL + this.url);
  }

}
