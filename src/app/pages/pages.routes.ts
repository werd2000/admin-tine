import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSetingsComponent } from './account-setings/account-setings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CentrosMedicosComponent } from './centros-medicos/centros-medicos.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { ProfesionalComponent } from './profesionales/profesional.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';



const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent,
        canActivate: [ VerificaTokenGuard ],
        data: {
            titulo: 'Dashboard',
            description: 'Tablero principal'
        }},
    { path: 'progress', component: ProgressComponent, data: {
            titulo: 'ProgressBar',
            description: 'Barra de progreso'
        }},
    { path: 'graficas1', component: Graficas1Component, data: {
            titulo: 'Gráficas',
            description: 'Gráficos de Dona'
        }},
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
    { path: 'account-settings', component: AccountSetingsComponent, data: { titulo: 'Ajustes de cuenta' }},
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil del usuario' }},
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' }},
    // Mantenimientos
    { path: 'usuarios', component: UsuariosComponent, canActivate: [ AdminGuard ], data: { titulo: 'Mantenimiento de usuarios' }},
    { path: 'centros-medicos', component: CentrosMedicosComponent, data: { titulo: 'Mantenimiento de Centros Médicos' }},
    { path: 'profesionales', component: ProfesionalesComponent, data: { titulo: 'Mantenimiento de Profesionales' }},
    { path: 'profesional/:id', component: ProfesionalComponent, data: { titulo: 'Actualizar Profesional' }},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
