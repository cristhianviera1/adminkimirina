import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {  }

  ngOnInit(): void {
    this.isLoggedIn()
  }

  loginUser(form: NgForm) {
    this.authService.loginUser(form.value).subscribe(res => {

      // tslint:disable-next-line: no-string-literal
      this.authService.acount = res['data'] as User;
      const loggedUser = this.authService.acount;
      if (loggedUser.rol !== 'admin') {
        Swal.fire('Error', `Necesitas ser Administrador para ingresar!`, 'error');
      } else {
        localStorage.setItem('loggedUser', JSON.stringify(this.authService.acount));
        Swal.fire('Bienvenido', `Has iniciado sesión con éxito!`, 'success');
        this.router.navigateByUrl('/component/users');
      }
    }, (err) => {
      Swal.fire('Error', `Ha ocurrido un error al iniciar la session!`, 'error');
    });
  }

  isLoggedIn() {
    const loggedUser = localStorage.getItem('loggedUser');

    if (loggedUser !== null) {
      this.router.navigateByUrl('/component/users');
    }
  }

}
