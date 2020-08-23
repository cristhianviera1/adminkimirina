import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = '/user';
  login = '/login';
  logout = '/logout';
  acount: User;
  selectedUser: User;
  isAdmin = null;

  constructor(private httpClient: HttpClient) {
    this.selectedUser = new User();
  }

  loginUser(user: User) {
    return this.httpClient.post(environment.API_URL + this.url + this.login, user);
  }

  logOutUser(json) {
    const headers = {
      responseType: 'text'
    };
    return this.httpClient.post(environment.API_URL + this.url + this.logout, json, {headers, reportProgress: true, observe: 'events'});
  }

  isLoggedIn() {
    let loggedUser: User;
    const session = localStorage.getItem('loggedUser');
    loggedUser = JSON.parse(session);

    if (loggedUser == null) {
      loggedUser = new User();
    }

    if (loggedUser.rol == null) {
      this.isAdmin = '';
    }
    this.isAdmin = loggedUser.rol;

    if (this.isAdmin !== 'admin' || this.isAdmin == null) {
      return false;
    }
    return true;
  }
}
