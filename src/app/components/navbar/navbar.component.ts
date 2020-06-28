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

  constructor(private usuarioService: UserService, private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('.sidenav').sidenav();
     });
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
        this.router.navigateByUrl('/kimirina');
      }
    });
  }

}
