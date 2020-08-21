import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[] = [];
  url = '/user';
  softDelete = '/softDelete';


  constructor(private httpClient: HttpClient) {
    this.selectedUser = new User();
   }

  getUsers() {
    return this.httpClient.get(environment.API_URL + this.url);
  }

  postUser(password: string, email: string, name: string, age: string, gender: string, rol: string, image: File) {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('rol', rol);
    formData.append('image', image);

    return this.httpClient.post<User>(environment.API_URL + this.url, formData, { reportProgress: true, observe: 'events'});
  }


  // tslint:disable-next-line: variable-name
  putUser(_id: string, password: string, email: string, name: string, age: string, gender: string, rol: string, image: File) {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('rol', rol);
    formData.append('image', image);

    return this.httpClient.put<User>(environment.API_URL + this.url + `/${_id}`, formData);
  }

  // tslint:disable-next-line: variable-name
  deleteUser(_id: string) {
    return this.httpClient.delete(environment.API_URL + this.url + `/${_id}`);
  }

  softDeleteUser(json: any) {
    const headers = {
      responseType: 'text'
    };
    return this.httpClient.post(environment.API_URL + this.url + this.softDelete, json, {headers});
  }

}

