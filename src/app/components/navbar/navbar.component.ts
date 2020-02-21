import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from './../../models/usuario';
import { Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private usuarioService: UserService, private router: Router) { }

  ngOnInit() {
  }

  logoutUsuario() {
    var usuarioJson = localStorage.getItem('usuariologeado');
    var usuarioObjeto = JSON.parse(usuarioJson);
    console.log(usuarioObjeto.id);
    var env = { id: usuarioObjeto.id };
    this.usuarioService.logoutUsuario(env).subscribe(res => {
      if (res["status"] == 200) {
        console.log(res);
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    });
  }

}
