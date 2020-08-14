import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private usuarioService: UserService, private router: Router) { }

  isLogged = false;
  isTimeOut = false;

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
      this.inactivityTime();
    }
  }

  logoutUsuario() {
    const usuarioJson = localStorage.getItem('usuariologeado');
    const usuarioObjeto = JSON.parse(usuarioJson);
    const env = { id: usuarioObjeto.id };
    this.usuarioService.logoutUsuario(env).subscribe(res => {
      if (res["status"] == 200) {
        localStorage.clear();
        this.router.navigateByUrl('/kimirina');
      }
    });
  }

  inactivityTime() {
    let time;

    window.onload = resetTimer;

    // DOM events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(timeOut, 6000000);
    }

    function timeOut() {
      localStorage.clear();
      window.location.reload();
    }
  }

}
