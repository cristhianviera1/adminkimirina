import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from './../../models/usuario';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

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
  postForm: FormGroup;
  putForm: FormGroup;
  preview: string;
  submitted = false;


  constructor(private usuarioService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUsuarios();

    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('.modal').modal();
    });

    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('input#nombre').characterCounter();
    });

    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('select').formSelect();
    });

    this.postForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['',  [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]],
      genero: ['', Validators.required],
      rol: ['', Validators.required],
      image: [null]
    });

    this.putForm = this.formBuilder.group({
      _id: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['',  [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]],
      genero: ['', Validators.required],
      rol: ['', Validators.required],
      image: [null]
    });
  }

  //Aceso a los controles de la forms
  get f() { return this.postForm.controls; }
  get fp() { return this.putForm.controls; }

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

  postUsuario() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    } else {
      this.usuarioService.postUsuarios(
        this.postForm.value.password,
        this.postForm.value.correo,
        this.postForm.value.nombre,
        this.postForm.value.edad,
        this.postForm.value.genero,
        this.postForm.value.rol,
        this.postForm.value.image
      ).subscribe(res => {
        console.log(res);
        this.getUsuarios();
      });
      this.cerrarModal();
      Swal.fire(
        'Muy Bien',
          'Usuario creado exitosamente',
          'success'
        );
    }
  }



  //---------------------------------------------------------------------------------------------

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarioService.usuarios = res as Usuario[];
    });
  }

  addUsuarioForm() {
    this.addUsuario = true;
    this.preview = '';
  }

  updUsuarioForm(usuario: Usuario) {
    this.updUsuario = true;
    this.usuarioService.selectedUsuario = usuario;
    this.preview = '';
  }

  putUsuario() {
    this.submitted = true;
    if (this.putForm.invalid) {
      return;
    } else {
      this.usuarioService.putUsuarios(
        this.putForm.value._id,
        this.putForm.value.password,
        this.putForm.value.correo,
        this.putForm.value.nombre,
        this.putForm.value.edad,
        this.putForm.value.genero,
        this.putForm.value.rol,
        this.putForm.value.image
      ).subscribe(res => {
        console.log(res);
        this.getUsuarios();
        location.reload();
      });
      this.cerrarModalUpd();
      Swal.fire(
        'Muy Bien',
          'Usuario actualizado exitosamente',
          'success'
        );
    }
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
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        );
      }
    });
  }

  softDelete(_id: string) {
    const env = { id: _id };

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
        this.usuarioService.softDelete(env).subscribe(res => {
          if (res["status"] == 200) {
          console.log(res);
          this.getUsuarios();
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
          } else {
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
          }
        });
      }
    });
  }

  cerrarModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("is-active");
    this.addUsuario = false;
    this.postForm.reset();
    this.preview = null;
  }

  cerrarModalUpd() {
    const modal = document.getElementById("modalupd");
    modal.classList.remove("is-active");
    this.updUsuario = false;
    this.preview = null;
    //this.putForm.controls['image'].reset();
  }


}
