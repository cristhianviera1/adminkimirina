import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  title: 'Productos';
  producto: Producto;
  productos: Array<Producto>;
  productoSeleccionado: Producto;
  updProducto = false;
  addProducto = false;
  url = '/productos';

  constructor(private service: ProductosService) { }

  ngOnInit() {
    this.producto = new Producto();
    this.productos = new Array<Producto>();

  }

}
