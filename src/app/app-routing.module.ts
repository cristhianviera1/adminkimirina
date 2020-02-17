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
import { LoginGuardGuard } from './guards/login-guard.guard';






const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'navbar', component: NavbarComponent, canActivate: [LoginGuardGuard]},
  { path: 'home', component: HomeComponent, canActivate: [LoginGuardGuard]},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [LoginGuardGuard]},
  { path: 'productos', component: ProductosComponent, canActivate: [LoginGuardGuard]},
  { path: 'novedades', component: NovedadesComponent, canActivate: [LoginGuardGuard]},
  { path: 'formularios', component: FormularioComponent, canActivate: [LoginGuardGuard]},
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
