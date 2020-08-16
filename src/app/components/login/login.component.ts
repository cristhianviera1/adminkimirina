import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

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

      this.usuarioService.cuenta = res["data"] as User;
      const usuarioLogado = this.usuarioService.cuenta;
      if (usuarioLogado.rol !== "admin") {
        Swal.fire('Error', `Necesitas ser Administrador para ingresar!`, 'error');
      } else {
        localStorage.setItem("usuariologeado", JSON.stringify(this.usuarioService.cuenta));
        Swal.fire('Bienvenido', `Has iniciado sesión con éxito!`, 'success');
        this.router.navigateByUrl('/home');
      }
    }, (err) => {
      Swal.fire('Error', `Ha ocurrido un error al iniciar la session!`, 'error');
    });
  }

}
