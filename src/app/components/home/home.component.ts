import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  cardsData = [{
    id: 1,
    image: '../../../assets/img/baner_usuarios.jpeg',
    title: 'Usuarios',
    subtitle: 'Gestión',
    content: 'Administra todos los usuarios de la aplicación movil y crea nuevos usuarios, brigadistas o administradores.',
    redirect: '/usuarios'
    },
  {
    id: 2,
    image: '../../../assets/img/baner_productos.jpg',
    title: 'Productos',
    subtitle: 'Gestión',
    content: 'Crea, modifica o elimina los productos y servicios los cuales se muestran el la applicación movil.',
    redirect: '/productos'
  },
  {
    id: 3,
    image: '../../../assets/img/baner_novedades.png',
    title: 'Noticias y novedades',
    subtitle: 'Gestión',
    content: 'Manten al dia a todos los usuarios de la applicacion movil actualizandola con nueva información.',
    redirect: '/novedades'
  },
  {
    id: 4,
    image: '../../../assets/img/estadistica.jpg',
    title: 'Datos estadisticos',
    subtitle: 'Gestión',
    content: 'Revisa los resultados de los formularios llenados por los usuarios de la app movil.',
    redirect: '/formularios'
  }];

  ngOnInit() {
  }

}
