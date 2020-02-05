import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from './../../models/usuario';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UserService]
})
export class UsuariosComponent implements OnInit {

  addUsuario = false;
  updUsuario = false;
  paginaActual: number = 1;
  previewImagen: "";


  constructor(private usuarioService: UserService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarioService.usuarios = res as Usuario[];
    });
  }

  addUsuarioForm() {
    this.addUsuario = true;
  }

  updUsuarioForm(usuario: Usuario) {
    this.updUsuario = true;
    this.usuarioService.selectedUsuario = usuario;
  }

  onFileChanges(files) {
    console.log("Archivo en base 64: ", files[0].base64);
    this.previewImagen = files[0].base64;
  }

  postUsuario(form: NgForm) {
    form.controls['imagen'].setValue(this.previewImagen);
    console.log(form.value);
    this.usuarioService.postUsuarios(form.value).subscribe(res => {
      console.log(res);
      this.getUsuarios();
      this.previewImagen = "";
    });
    this.cerrarModal(form);
    Swal.fire(
      'Muy Bien',
        'Usuario creado exitosamente',
        'success'
      );
  }

  putUsuario(form: NgForm) {
    form.controls['imagen'].setValue(this.previewImagen);
    this.usuarioService.putUsuarios(form.value).subscribe(res => {
      console.log(res);
      this.getUsuarios();
      this.previewImagen = "";
    });
    this.cerrarModalUpd();
    Swal.fire(
      'Muy Bien',
        'Usuario actualizado exitosamente',
        'success'
      );
  }

  deleteUsuario(_id: string) {

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
        this.usuarioService.deleteUsuario(_id).subscribe(res => {
          console.log(res);
          this.getUsuarios();
        });
        Swal.fire(
          'Eliminada!',
          'El usuario ha sido eliminado.',
          'success'
        )
      }
    })
  }

  cerrarModal(form?: NgForm) {
    const modal = document.getElementById("modal");
    modal.classList.remove("is-active");
    this.addUsuario = false;
    if (form) {
      form.reset();
      this.usuarioService.selectedUsuario = new Usuario();
    }
  }

  cerrarModalUpd() {
    const modal = document.getElementById("modalupd");
    modal.classList.remove("is-active");
    this.updUsuario = false;
  }


}
