import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Form } from './../models/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  selectedForm: Form;
  forms: Form[] = [];
  url = '/form';

  constructor(private httpClient: HttpClient) {
    this.selectedForm = new Form();
  }

  getForms() {
    return this.httpClient.get(environment.API_URL + this.url);
  }
}
