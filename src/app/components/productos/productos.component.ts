import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService]
})
export class ProductosComponent implements OnInit {

  addProducto = false;
  updProducto = false;
  currentPage = 1;
  filtertext: '';
  postForm: FormGroup;
  putForm: FormGroup;
  preview: string;
  reg = '^(http|https|ftp)?(://)?(www|ftp)?.?[a-z0-9-]+(.|:)([a-z0-9-]+)+([/?].*)?$';

  constructor(private productoService: ProductosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filtertext = '';
    this.getProductos();

    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('.modal').modal();
    });

    this.postForm = this.formBuilder.group({
      titulo: ['', Validators.minLength(6)],
      descripcion: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(this.reg)]],
      precio: ['', Validators.required],
      observaciones: ['', Validators.required],
      image: [null]
    });

    this.putForm = this.formBuilder.group({
      _id: [''],
      titulo: ['', Validators.minLength(6)],
      descripcion: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(this.reg)]],
      precio: ['', Validators.required],
      observaciones: ['', Validators.required],
      image: [null]
    });
  }

  // Acceso a los controles de la form
  get f() { return this.postForm.controls; }
  get fp() { return this.putForm.controls; }


  updProductoForm(producto: Producto) {
    this.productoService.selectedProducto = producto;
    $('#modal2').modal('open');
    $('#titulo1').next().addClass('active');
    $('#precio1').next().addClass('active');
    $('#link1').next().addClass('active');
    $('#observacion1').next().addClass('active');
    $('#descripcion1').next().addClass('active');
  }

  getProductos() {
    this.productoService.getProductos().subscribe(res => {
      this.productoService.productos = res as Producto[];
    });
  }

  // Subir imagen
  uploadFile(event, accion: boolean) {
    const file = (event.target as HTMLInputElement).files[0];

    if (accion === true) {
      this.postForm.patchValue({
        image: file
      });
      this.postForm.get('image').updateValueAndValidity();
    } else {
      this.putForm.patchValue({
        image: file
      });

      this.putForm.get('image').updateValueAndValidity();
    }

    // File preview

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  // ------------------------------------------------

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
      if (res["status"] == 200) {
        this.getProductos();
        this.cerrarModal(true);
        Swal.fire(
          'Muy Bien',
          'Se ha creado exitosamente',
          'success'
        );
      } else {
        this.cerrarModal(true);
      }
      });
    this.cerrarModal(true);
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
      this.getProductos();
      location.reload();
    });
    this.cerrarModal(false);
    Swal.fire(
      'Muy Bien',
      'Producto actualizado exitosamente',
      'success'
    );
  }

  // tslint:disable-next-line: variable-name
  deleteProducto(_id: string) {

    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podras resvertir esta acción!',
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

  cerrarModal(accion: boolean) {
    $('.modal').modal('close');

    if (accion === true) {
      // Validos
    $('#titulo').removeClass('valid').val('');
    $('#titulo').next().removeClass('active');
    $('#precio').removeClass('valid').val('');
    $('#precio').next().removeClass('active');
    $('#link').removeClass('valid').val('');
    $('#link').next().removeClass('active');
    $('#observacion').removeClass('valid').val('');
    $('#observacion').next().removeClass('active');
    $('#descripcion').removeClass('valid').val('');
    $('#descripcion').next().removeClass('active');
    // Invalidos
    $('#titulo').removeClass('invalid').val('');
    $('#precio').removeClass('invalid').val('');
    $('#link').removeClass('invalid').val('');
    $('#observacion').removeClass('invalid').val('');
    $('#descripcion').removeClass('invalid').val('');

    this.postForm.reset();
    this.postForm.clearValidators();
    } else {
      // Validos
    $('#titulo').removeClass('valid').val('');
    $('#titulo').next().removeClass('active');
    $('#precio').removeClass('valid').val('');
    $('#precio').next().removeClass('active');
    $('#link').removeClass('valid').val('');
    $('#link').next().removeClass('active');
    $('#observacion').removeClass('valid').val('');
    $('#observacion').next().removeClass('active');
    $('#descripcion').removeClass('valid').val('');
    $('#descripcion').next().removeClass('active');
    // Invalidos
    $('#titulo').removeClass('invalid').val('');
    $('#precio').removeClass('invalid').val('');
    $('#link').removeClass('invalid').val('');
    $('#observacion').removeClass('invalid').val('');
    $('#descripcion').removeClass('invalid').val('');

    this.putForm.clearValidators();
    }
  }

}
