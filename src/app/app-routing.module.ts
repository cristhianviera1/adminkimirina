import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { FormularioComponent } from './components/formulario/formulario.component';






const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'navbar', component: NavbarComponent},
  { path: 'home', component: HomeComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'novedades', component: NovedadesComponent},
  { path: 'formularios', component: FormularioComponent},
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
