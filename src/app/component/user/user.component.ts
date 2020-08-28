import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  templateUrl: './user.component.html',
  providers: [UserService]
})
export class UserComponent implements OnInit {

  page = 1;
  pageSize = 10;
  filtertext: null;
  postForm: FormGroup;
  putForm: FormGroup;
  previewImage: string;
  passwordPattern = '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,60}';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  // Error Messages
  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `${label} Obligatorio!`
    }, {
      error: 'pattern',
      format: (label, error) => `${label} Esto no luce bien...`
    }, {
      error: 'minlength',
      format: (label, error) => `${label} Debe contener al menos 8 caracteres`
    }
  ];

  constructor(public userService: UserService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filtertext = null;
    this.getUsers();

    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      // lanzar email en minusculas
      $('#email, #email2').on('change keyup paste', function() {
        $(this).val($(this).val().toLowerCase());
         });
    });

    this.postForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      email: ['',  [Validators.required, Validators.pattern(this.emailPattern)]],
      name: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9_]+(?:\W+[a-zA-Z0-9_]+)*\W*$/)]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      rol: ['', Validators.required],
      image: [null, Validators.required]
    });

    this.putForm = this.formBuilder.group({
      _id: [''],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      email: ['',  [Validators.required, Validators.pattern(this.emailPattern)]],
      name: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9_]+(?:\W+[a-zA-Z0-9_]+)*\W*$/)]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      rol: ['', Validators.required],
      image: [null]
    });
  }

  // Acceso a los controles de la form
  // Post Form
  get f() { return this.postForm.controls; }
  // Put Form
  get fp() { return this.putForm.controls; }

  uploadFile(event, accion: boolean) {
    const file = (event.target as HTMLInputElement).files[0];

    const filename = file.name;

    if (accion === true) {
      document.getElementById('filename').innerHTML= filename;
      this.postForm.patchValue({
        image: file
      });
      this.postForm.get('image').updateValueAndValidity();
    } else {
      document.getElementById('filename2').innerHTML= filename;
      this.putForm.patchValue({
        image: file
      });
      this.putForm.get('image').updateValueAndValidity();
    }

    // File preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Modales
  // This is for the first modal
  open1(content1: string) {
    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((_result) => {
      this.postForm.reset();
    }, (_reason) => {
      this.postForm.reset();
    });
  }

  open2(content2: string, user: User) {
    this.userService.selectedUser = user;
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((_result) => {
    }, (_reason) => {
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.userService.users = res['data'] as User[];
    });
  }

  postUser() {
    if (this.postForm.invalid) {
      return;
    } else {
      this.userService.postUser(
        this.postForm.value.password,
        this.postForm.value.email,
        this.postForm.value.name,
        this.postForm.value.age,
        this.postForm.value.gender,
        this.postForm.value.rol,
        this.postForm.value.image
      ).subscribe(res => {
        const resJson = JSON.stringify(res);
        const resObject = JSON.parse(resJson);
        // tslint:disable-next-line: no-string-literal
        if (resObject['status'] === 200) {
          this.getUsers();
          Swal.fire(
            'Muy Bien',
            'Se ha creado exitosamente',
            'success'
          );
          this.modalService.dismissAll();
        }
      });
    }
  }

  putUser() {
    if (this.putForm.invalid) {
      return;
    } else {
      this.userService.putUser(
        this.putForm.value._id,
        this.putForm.value.password,
        this.putForm.value.email,
        this.putForm.value.name,
        this.putForm.value.age,
        this.putForm.value.gender,
        this.putForm.value.rol,
        this.putForm.value.image
      ).subscribe(res => {
        console.log(res);
        this.getUsers();
        location.reload();
      });
      Swal.fire(
        'Muy Bien',
          'Usuario actualizado exitosamente',
          'success'
        );
    }
  }

 // tslint:disable-next-line: variable-name
 softDelete(_id: string) {
  const env = { id: _id };

  Swal.fire({
    title: 'Estas seguro?',
    text: 'No podras revertir esta acción!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#745AF2',
    cancelButtonColor: '#EF5350',
    confirmButtonText: 'Si, eliminalo!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value) {
      this.userService.softDeleteUser(env).subscribe(res => {
        // tslint:disable-next-line: no-string-literal tslint:disable-next-line: triple-equals
        if (res['status'] == 200) {
          this.getUsers();
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

}
