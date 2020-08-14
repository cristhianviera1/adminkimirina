import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from './../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUsuario: Usuario;
  usuarios: Usuario[];
  url = '/usuario';
  login = '/login';
  logout = '/logout';
  soft = '/soft';
  cuenta: Usuario;
  esAdmin = null;

  constructor(private httpClient: HttpClient) {
    this.selectedUsuario = new Usuario();
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

    return this.httpClient.post<Usuario>(environment.API_URL + this.url, formData, { reportProgress: true, observe: 'events'});
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

    return this.httpClient.put<Usuario>(environment.API_URL + this.url + `/${_id}`, formData);
  }

  // tslint:disable-next-line: variable-name
  deleteUsuario(_id: string) {
    return this.httpClient.delete(environment.API_URL + this.url + `/${_id}`);
  }

  loginUsuario(usuario: Usuario) {
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
    let usuarioLogado: Usuario;
    const session = localStorage.getItem('usuariologeado');
    usuarioLogado = JSON.parse(session);

    if (usuarioLogado == null) {
      usuarioLogado = new Usuario();
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
