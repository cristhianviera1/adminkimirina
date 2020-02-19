import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
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
  postForm: FormGroup;
  putForm: FormGroup;
  preview: string;

  constructor(private productoService: ProductosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProductos();

    this.postForm = this.formBuilder.group({
      titulo: ['', Validators.minLength(6)],
      descripcion: ['', Validators.required],
      link: ['', Validators.required],
      precio: ['', Validators.required],
      observaciones: ['', Validators.required],
      image: [null]
    });

    this.putForm = this.formBuilder.group({
      _id: [''],
      titulo: ['', Validators.minLength(6)],
      descripcion: ['', Validators.required],
      link: ['', Validators.required],
      precio: ['', Validators.required],
      observaciones: ['', Validators.required],
      image: [null]
    });
  }

  addProductoForm() {
    this.addProducto = true;
    this.preview = '';
  }

  updProductoForm(producto: Producto) {
    this.updProducto = true;
    this.productoService.selectedProducto = producto;
    this.preview = '';
  }

  getProductos() {
    this.productoService.getProductos().subscribe(res => {
      this.productoService.productos = res as Producto[];
    });
  }

  //---------------------------------------------------
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({
      image: file
    });

    this.postForm.get('image').updateValueAndValidity();

    //File preview

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  updateFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.putForm.patchValue({
      image: file
    });

    this.putForm.get('image').updateValueAndValidity();

    //File preview

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  //------------------------------------------------

  postProducto() {
    console.log(this.postForm.value);
    this.productoService.postProducto(
      this.postForm.value.titulo,
      this.postForm.value.descripcion,
      this.postForm.value.link,
      this.postForm.value.precio,
      this.postForm.value.observaciones,
      this.postForm.value.image
    ).subscribe(res => {
        console.log(res);
        this.getProductos();
      });
    this.cerrarModal();
    Swal.fire(
      'Muy Bien',
      'Producto creado exitosamente',
      'success'
    );
  }

  putProducto() {
    this.productoService.putProducto(
      this.putForm.value._id,
      this.putForm.value.titulo,
      this.putForm.value.descripcion,
      this.putForm.value.link,
      this.putForm.value.precio,
      this.putForm.value.observaciones,
      this.putForm.value.image
    ).subscribe(res => {
      console.log(res);
      this.getProductos();
      location.reload();
    });
    this.cerrarModalUpd();
    Swal.fire(
      'Muy Bien',
      'Producto actualizado exitosamente',
      'success'
    );
  }

  deleteProducto(_id: string) {

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

  cerrarModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("is-active");
    this.addProducto = false;
    this.postForm.reset();
    this.preview = null;
  }

  cerrarModalUpd() {
    const modal = document.getElementById("modalupd");
    modal.classList.remove("is-active");
    this.updProducto = false;
    this.preview = null;
  }

}
