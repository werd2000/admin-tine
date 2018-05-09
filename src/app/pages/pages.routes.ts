import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSetingsComponent } from './account-setings/account-setings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard',
                component: DashboardComponent,
                data: {
                    titulo: 'Dashboard',
                    description: 'Tablero principal'
                }},
            { path: 'progress', component: ProgressComponent,
                data: {
                    titulo: 'ProgressBar',
                    description: 'Barra de progreso'
                }},
            { path: 'graficas1', component: Graficas1Component, 
                data: {
                    titulo: 'Gráficas',
                    description: 'Gráficos de Dona'
                }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
            { path: 'account-settings', component: AccountSetingsComponent, data: { titulo: 'Ajustes de cuenta' }},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
