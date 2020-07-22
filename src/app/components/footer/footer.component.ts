import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.isLoggedOn();
  }

  isLoggedOn() {
    const usuarioLogado = localStorage.getItem('usuariologeado');

    if (usuarioLogado !== null) {
      this.router.navigateByUrl('/home');
    }
  }

}
