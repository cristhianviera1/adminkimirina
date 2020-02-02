import { Component, OnInit } from '@angular/core';
import { NovedadesService } from './../../services/novedades.service';
import { Novedad } from './../../models/novedad';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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

  constructor(private novedadService: NovedadesService) { }

  ngOnInit() {
    this.getNovedades();
  }

  addNovedadForm() {
    this.addNovedad = true;
  }

  updNovedadForm(novedad: Novedad) {
    this.updNovedad = true;
    this.novedadService.selectedNovedad = novedad;
  }

  getNovedades() {
    this.novedadService.getNovedades().subscribe(res => {
      this.novedadService.novedades = res as Novedad[];
    });
  }

  postNovedad(form: NgForm) {
    console.log(form.value);
    this.novedadService.postNovedad(form.value).subscribe(res => {
      console.log(res);
      this.getNovedades();
    });
    this.cerrarModal(form);
    Swal.fire(
      'Muy Bien',
        'Novedad creada exitosamente',
        'success'
      );
  }

  putNovedad(form: NgForm) {
    this.novedadService.putNovedad(form.value).subscribe(res => {
      console.log(res);
      this.getNovedades();
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
        )
      }
    })
  }

  cerrarModal(form?: NgForm) {
    const modal = document.getElementById("modal");
    modal.classList.remove("is-active");
    this.addNovedad = false;
    if (form) {
      form.reset();
      this.novedadService.selectedNovedad = new Novedad();
    }
  }

  cerrarModalUpd() {
    const modal = document.getElementById("modalupd");
    modal.classList.remove("is-active");
    this.updNovedad = false;
  }


}
