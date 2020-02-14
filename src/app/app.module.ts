import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ExportadorxlsService } from './services/exportadorxls.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    Page404Component,
    UsuariosComponent,
    ProductosComponent,
    NoticiasComponent,
    NovedadesComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    AlifeFileToBase64Module
  ],
  providers: [ExportadorxlsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
