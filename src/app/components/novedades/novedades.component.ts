import { Component, OnInit } from '@angular/core';
import { NovedadesService } from './../../services/novedades.service';
import { Novedad } from './../../models/novedad';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css'],
  providers: [NovedadesService]
})
export class NovedadesComponent implements OnInit {

  addNovedad = false;
  updNovedad = false;
  paginaActual: number = 1;
  postForm: FormGroup;
  putForm: FormGroup;
  preview: string;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private novedadService: NovedadesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getNovedades();

    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('.modal').modal();
    });

    $('#observacion').val('New Text');
    $('#descripcion').val('New Text');
    $('#observacion1').val('New Text');
    $('#descripcion1').val('New Text');

    this.postForm = this.formBuilder.group({
      titulo: ['', Validators.minLength(6)],
      descripcion: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(this.reg)]],
      image: [null]
    });

    this.putForm = this.formBuilder.group({
      _id: [''],
      titulo: ['', Validators.minLength(6)],
      descripcion: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(this.reg)]],
      image: [null]
    });
  }

  // Acceso a los controles de la form
  get f() { return this.postForm.controls; }
  get fp() { return this.putForm.controls; }

  updNovedadForm(novedad: Novedad) {
    this.novedadService.selectedNovedad = novedad;
    $('#modal2').modal('open');
    $('#titulo1').next().addClass('active');
    $('#precio1').next().addClass('active');
    $('#link1').next().addClass('active');
    $('#descripcion1').next().addClass('active');
  }

  getNovedades() {
    this.novedadService.getNovedades().subscribe(res => {
      this.novedadService.novedades = res as Novedad[];
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

  postNovedad() {
    console.log(this.postForm.value);
    this.novedadService.postNovedad(
      this.postForm.value.titulo,
      this.postForm.value.descripcion,
      this.postForm.value.link,
      this.postForm.value.image
    ).subscribe(res => {
        console.log(res);
        this.getNovedades();
      });
    this.cerrarModal();
    Swal.fire(
      'Muy Bien',
      'Novedad creada exitosamente',
      'success'
    );
  }

  putNovedad() {
    this.novedadService.putNovedad(
      this.putForm.value._id,
      this.putForm.value.titulo,
      this.putForm.value.descripcion,
      this.putForm.value.link,
      this.putForm.value.image
    ).subscribe(res => {
      console.log(res);
      this.getNovedades();
      location.reload();
    });
    this.cerrarModalUpd();
    Swal.fire(
      'Muy Bien',
      'Novedad actualizada exitosamente',
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
        this.novedadService.deleteNovedad(_id).subscribe(res => {
          console.log(res);
          this.getNovedades();
        });
        Swal.fire(
          'Eliminado!',
          'La novedad ha sido eliminada.',
          'success'
        );
      }
    });
  }

  cerrarModal() {
    $('.modal').modal('close');
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
    this.preview = null;
  }

  cerrarModalUpd() {
    $('.modal').modal('close');
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
    this.preview = null;
  }


}
