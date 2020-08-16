import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUsuario: User;
  usuarios: User[];
  url = '/user';
  login = '/login';
  logout = '/logout';
  soft = '/soft';
  cuenta: User;
  esAdmin = null;

  constructor(private httpClient: HttpClient) {
    this.selectedUsuario = new User();
   }

  getUsuarios() {
    return this.httpClient.get(environment.API_URL + this.url);
  }

  postUsuarios(password: string, correo: string, nombre: string, edad: string, genero: string, rol: string, image: File) {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('correo', correo);
    formData.append('nombre', nombre);
    formData.append('edad', edad);
    formData.append('genero', genero);
    formData.append('rol', rol);
    formData.append('image', image);

    return this.httpClient.post<User>(environment.API_URL + this.url, formData, { reportProgress: true, observe: 'events'});
  }


  // tslint:disable-next-line: variable-name
  putUsuarios(_id: string, password: string, correo: string, nombre: string, edad: string, genero: string, rol: string, image: File) {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('correo', correo);
    formData.append('nombre', nombre);
    formData.append('edad', edad);
    formData.append('genero', genero);
    formData.append('rol', rol);
    formData.append('image', image);

    return this.httpClient.put<User>(environment.API_URL + this.url + `/${_id}`, formData);
  }

  // tslint:disable-next-line: variable-name
  deleteUsuario(_id: string) {
    return this.httpClient.delete(environment.API_URL + this.url + `/${_id}`);
  }

  loginUsuario(usuario: User) {
    return this.httpClient.post(environment.API_URL + this.url + this.login, usuario);
  }

  logoutUsuario(json) {
    const headers = {
      responseType: 'text'
    };
    return this.httpClient.post(environment.API_URL + this.url + this.logout, json, {headers});
  }

  softDelete(json) {
    const headers = {
      responseType: 'text'
    };
    return this.httpClient.post(environment.API_URL + this.url + this.soft, json, {headers});
  }

  isLoggedIn() {
    let usuarioLogado: User;
    const session = localStorage.getItem('usuariologeado');
    usuarioLogado = JSON.parse(session);

    if (usuarioLogado == null) {
      usuarioLogado = new User();
    }

    if (usuarioLogado.rol == null) {
      this.esAdmin = '';
    }
    this.esAdmin = usuarioLogado.rol;

    if (this.esAdmin !== 'admin' || this.esAdmin == null) {
      return false;
    }
    return true;
  }

}
