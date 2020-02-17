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
  urlIntentaAcceder = '';
  cuenta: Usuario;

  constructor(private httpClient: HttpClient) {
    this.selectedUsuario = new Usuario();
   }

  getUsuarios() {
    return this.httpClient.get(environment.API_URL + this.url);
  }

  postUsuarios(usuario: Usuario) {
    return this.httpClient.post(environment.API_URL + this.url, usuario);
  }

  putUsuarios(usuario: Usuario) {
    return this.httpClient.put(environment.API_URL + this.url + `/${usuario._id}`, usuario);
  }

  deleteUsuario(_id: string) {
    return this.httpClient.delete(environment.API_URL + this.url+ `/${_id}`);
  }

  loginUsuario(usuario: Usuario) {
    return this.httpClient.post(environment.API_URL + this.url + this.login, usuario);
  }

  logoutUsuario(json) {
    const headers = {
      responseType: 'text'
    };
    return this.httpClient.post(environment.API_URL + this.url + this.logout, json,{headers});
  }

  isLoggedIn() {
    var usuarioLogado: Usuario;
    var session = localStorage.getItem('usuariologeado');
    usuarioLogado = JSON.parse(session);
    let esAdmin = usuarioLogado.rol;

    if (esAdmin !== "Administrador" || esAdmin == null) {
      return false;
    }
    return true;
  }

}
