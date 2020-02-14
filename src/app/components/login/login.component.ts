import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from './../../models/usuario';
import { Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UserService, private router: Router) { }

  ngOnInit() {
  }

  loginUsuario(form: NgForm) {
    this.usuarioService.loginUsuario(form.value).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/home');
      this.usuarioService.cuenta = res as Usuario[];
      localStorage.setItem("usuariologeado", JSON.stringify(this.usuarioService.cuenta));
      Swal.fire('Bienvenido', `Has iniciado sesión con éxito!`, 'success');
    }, (err) => {
      Swal.fire('Error', `Ha ocurrido un error al iniciar la session!`, 'error');
    });
  }

}
