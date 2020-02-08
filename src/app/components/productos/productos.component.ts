import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService]
})
export class ProductosComponent implements OnInit {

  addProducto = false;
  updProducto = false;
  paginaActual: number = 1;

  constructor(private productoService: ProductosService) { }

  ngOnInit() {
    this.getProductos();
  }

  addProductoForm() {
    this.addProducto = true;
  }

  updProductoForm(producto: Producto) {
    this.updProducto = true;
    this.productoService.selectedProducto = producto;
  }

  getProductos() {
    this.productoService.getProductos().subscribe(res => {
      this.productoService.productos = res as Producto[];
    });
  }

  postProducto(form: NgForm) {
    console.log(form.value);
    this.productoService.postProducto(form.value).subscribe(res => {
      console.log(res);
      this.getProductos();
    });
    this.cerrarModal(form);
    Swal.fire(
      'Muy Bien',
        'Producto creado exitosamente',
        'success'
      );
  }

  putNovedad(form: NgForm) {
    this.productoService.putProducto(form.value).subscribe(res => {
      console.log(res);
      this.getProductos();
    });
    this.cerrarModalUpd();
    Swal.fire(
      'Muy Bien',
        'Producto actualizado exitosamente',
        'success'
      );
  }

  deleteNovedad(_id: string) {

    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras resvertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.productoService.deleteProducto(_id).subscribe(res => {
          console.log(res);
          this.getProductos();
        });
        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
  }

  cerrarModal(form?: NgForm) {
    const modal = document.getElementById("modal");
    modal.classList.remove("is-active");
    this.addProducto = false;
    if (form) {
      form.reset();
      this.productoService.selectedProducto = new Producto();
    }
  }

  cerrarModalUpd() {
    const modal = document.getElementById("modalupd");
    modal.classList.remove("is-active");
    this.updProducto = false;
  }

}
