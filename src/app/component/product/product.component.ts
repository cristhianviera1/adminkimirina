import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  page = 1;
  pageSize = 4;
  filtertext: '';
  postForm: FormGroup;
  putForm: FormGroup;
  preview: string;
  urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

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
      format: (label, error) => `${label} Debe contener al menos 6 caracteres`
    }, {
      error: 'min',
      format: (label, error) => `${label} El valor minimo debe ser 0`
    }
  ];

  constructor(public productService: ProductService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.filtertext = '';
    this.getProducts();

    this.postForm = this.formBuilder.group({
      title: ['', [Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9_]+(?:\W+[a-zA-Z0-9_]+)*\W*$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+(?:\W+[a-zA-Z0-9_]+)*\W*$/)]],
      link: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      price: ['', Validators.required],
      observations: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+(?:\W+[a-zA-Z0-9_]+)*\W*$/)]],
      image: [null, Validators.required]
    });

    this.putForm = this.formBuilder.group({
      _id: [''],
      title: ['',[ Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9_]+(?:\W+[a-zA-Z0-9_]+)*\W*$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+(?:\W+[a-zA-Z0-9_]+)*\W*$/)]],
      link: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      price: ['', Validators.required],
      observations: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+(?:\W+[a-zA-Z0-9_]+)*\W*$/)]],
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

  open2(content2: string, product: Product) {
    this.productService.selectedProduct = product;
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((_result) => {
    }, (_reason) => {
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.productService.products = res['data'] as Product[];
    });
  }

  postProduct() {
    if (this.postForm.invalid) {
      return;
    } else {
      this.productService.postProduct(
        this.postForm.value.title,
        this.postForm.value.description,
        this.postForm.value.link,
        this.postForm.value.price,
        this.postForm.value.observations,
        this.postForm.value.image
      ).subscribe(res => {
        const resJson = JSON.stringify(res);
        const resObject = JSON.parse(resJson);
        // tslint:disable-next-line: no-string-literal
        if (resObject['status'] == 200) {
          this.getProducts();
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

  putProduct() {
    if (this.putForm.invalid) {
      return;
    } else {
      this.productService.putProduct(
        this.putForm.value._id,
        this.putForm.value.title,
        this.putForm.value.description,
        this.putForm.value.link,
        this.putForm.value.price,
        this.putForm.value.observations,
        this.putForm.value.image
      ).subscribe(res => {
        if (res["status"] == 200) {
          this.getProducts();
          Swal.fire(
            'Muy Bien',
            'Producto actualizado exitosamente',
            'success'
          );
        }
        location.reload();
      });
    }
  }

  // tslint:disable-next-line: variable-name
  deleteProduct(_id: string) {
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
        this.productService.deleteProduct(_id).subscribe(res => {
          this.getProducts();
        });
        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
  }

}
