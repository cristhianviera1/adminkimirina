import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { UserComponent } from './user/user.component';

import { FiltertablePipe } from '../pipes/filtertable.pipe';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { ProductComponent } from './product/product.component';
import { NewsComponent } from './news/news.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgBootstrapFormValidationModule
  ],
  declarations: [
    FiltertablePipe,
    UserComponent,
    ProductComponent,
    NewsComponent,
    FormComponent
  ]
})
export class ComponentsModule {}
