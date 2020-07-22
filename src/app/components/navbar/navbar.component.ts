import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged = false;

  constructor(private usuarioService: UserService, private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('.sidenav').sidenav();
     });

    this.isLoggedIn();
  }

  isLoggedIn() {
    const usuarioLogado = localStorage.getItem('usuariologeado');

    if (usuarioLogado == null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }

  logoutUsuario() {
    const usuarioJson = localStorage.getItem('usuariologeado');
    const usuarioObjeto = JSON.parse(usuarioJson);
    console.log(usuarioObjeto.id);
    const env = { id: usuarioObjeto.id };
    this.usuarioService.logoutUsuario(env).subscribe(res => {
      if (res["status"] == 200) {
        console.log(res);
        localStorage.clear();
        this.router.navigateByUrl('/kimirina');
      }
    });
  }

}
