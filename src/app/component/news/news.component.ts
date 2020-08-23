import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  providers: [NewsService]
})
export class NewsComponent implements OnInit {

  page = 1;
  pageSize = 4;
  filtertext: '';
  postForm: FormGroup;
  putForm: FormGroup;
  preview: string;
  submittedForm = false;
  urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  // Error Messages
  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `${label} Obligatorio!`
    }, {
      error: 'pattern',
      format: (label, error) => `${label} Por favor ingresa una URL valida`
    }, {
      error: 'minlength',
      format: (label, error) => `${label} Debe contener al menos 6 caracteres`
    }
  ];

  constructor(public newsService: NewsService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.filtertext = '';
    this.getNews();

    this.postForm = this.formBuilder.group({
      title: ['', Validators.minLength(6)],
      description: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      image: [null, Validators.required]
    });

    this.putForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.minLength(6)],
      description: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      image: [null]
    });
  }

  // Acceso a los controles de la form
  // Post Form
  get f() { return this.postForm.controls; }
  // Put Form
  get fp() { return this.putForm.controls; }

  // Subir imagen
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
      this.preview = reader.result as string;
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

  open2(content2: string, news: News) {
    this.newsService.selectedNews = news;
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((_result) => {
    }, (_reason) => {
    });
  }

  getNews() {
    this.newsService.getNews().subscribe(res => {
      this.newsService.news = res['data'] as News[];
    });
  }

  postNews() {
    if (this.postForm.invalid) {
      return;
    } else {
    this.newsService.postNews(
      this.postForm.value.title,
      this.postForm.value.description,
      this.postForm.value.link,
      this.postForm.value.image
    ).subscribe(res => {
      if (res["status"] == 200) {
          this.getNews();
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

  putNews() {
    if (this.putForm.invalid) {
      return;
    } else {
    this.newsService.putNews(
      this.putForm.value._id,
      this.putForm.value.titulo,
      this.putForm.value.descripcion,
      this.putForm.value.link,
      this.putForm.value.image
    ).subscribe(res => {
      if (res["status"] == 200) {
          this.getNews();
          Swal.fire(
            'Muy Bien',
            'Novedad actualizada exitosamente',
            'success'
          );
        }
        location.reload();
      });
    }
  }

   // tslint:disable-next-line: variable-name
   deleteNews(_id: string) {
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
        this.newsService.deleteNews(_id).subscribe(res => {
          this.getNews();
        });
        Swal.fire(
          'Eliminado!',
          'La novedad ha sido eliminada.',
          'success'
        );
      }
    });
  }
}
