import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UserService]
})
export class UsuariosComponent implements OnInit {

  currentPage = 1;
  filtertext: '';
  postForm: FormGroup;
  putForm: FormGroup;
  preview: string;
  submitted = false;
  passwordPattern = '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,60}';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';


  constructor(private usuarioService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filtertext = '';
    this.getUsuarios();

    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      // lanzar modal
      $('.modal').modal();
      // lanzar select
      $('select').formSelect();
      // lanzar email en minusculas
      $('#email, #email2').on('change keyup paste', function() {
        $(this).val($(this).val().toLowerCase());
         });
    });

    this.postForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      correo: ['',  [Validators.required, Validators.pattern(this.emailPattern)]],
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      rol: ['', Validators.required],
      image: [null]
    });

    this.putForm = this.formBuilder.group({
      _id: [''],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      correo: ['',  [Validators.required, Validators.pattern(this.emailPattern)]],
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      rol: ['', Validators.required],
      image: [null]
    });
  }

  // Acceso a los controles de la form
  get f() { return this.postForm.controls; }
  get fp() { return this.putForm.controls; }

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
        if (res["status"] == 200) {
          this.getUsuarios();
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
  }



  // ---------------------------------------------------------------------------------------------

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarioService.usuarios = res as User[];
    });
  }

  updUsuarioForm(usuario: User) {
    this.usuarioService.selectedUsuario = usuario;
    $('#modal2').modal('open');
    $('#nombre2').next().addClass('active');
    $('#email2').next().addClass('active');
    $('#password2').next().addClass('active');
    $('#edad2').next().addClass('active');
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
      this.cerrarModal(false);
      Swal.fire(
        'Muy Bien',
          'Usuario actualizado exitosamente',
          'success'
        );
    }
  }

  // tslint:disable-next-line: variable-name
  deleteUsuario(_id: string) {

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

  // tslint:disable-next-line: variable-name
  softDelete(_id: string) {
    const env = { id: _id };

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
        this.usuarioService.softDelete(env).subscribe(res => {
          // tslint:disable-next-line: no-string-literal tslint:disable-next-line: triple-equals
          if (res['status'] == 200) {
          console.log(res);
          this.getUsuarios();
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
          } else {
            Swal.fire(
              'Error',
              'No se ha podido eliminar el usuario.',
              'error'
            );
          }
        });
      }
    });
  }

  cerrarModal(accion: boolean) {
    $('.modal').modal('close');
    if (accion === true) {
      // Validos
    $('#nombre').removeClass('valid').val('');
    $('#nombre').next().removeClass('active');
    $('#email').removeClass('valid').val('');
    $('#email').next().removeClass('active');
    $('#password').removeClass('valid').val('');
    $('#password').next().removeClass('active');
    $('#edad').removeClass('valid').val('');
    $('#edad').next().removeClass('active');
    // Invalidos
    $('#nombre').removeClass('invalid').val('');
    $('#email').removeClass('invalid').val('');
    $('#password').removeClass('invalid').val('');
    $('#edad').removeClass('invalid').val('');

    this.postForm.reset();
    this.postForm.clearValidators();
    this.postForm.clearAsyncValidators();
    } else {
      // Validos
    $('#nombre2').removeClass('valid').val('');
    $('#nombre2').next().removeClass('active');
    $('#email2').removeClass('valid').val('');
    $('#email2').next().removeClass('active');
    $('#password2').removeClass('valid').val('');
    $('#password2').next().removeClass('active');
    $('#edad2').removeClass('valid').val('');
    $('#edad2').next().removeClass('active');
    // Invalidos
    $('#nombre2').removeClass('invalid').val('');
    $('#email2').removeClass('invalid').val('');
    $('#password2').removeClass('invalid').val('');
    $('#edad2').removeClass('invalid').val('');

    // this.putForm.reset();
    this.putForm.clearValidators();
    }
    this.preview = null;
  }


}
