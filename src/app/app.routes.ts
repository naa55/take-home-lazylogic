import { Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';

export const routes: Routes = [
    {
        path: 'roles',
        loadChildren: () => import('./role/role-routing.module').then(m => m.RoleRoutingModule)
    },
    {
        path: '',
        component: RoleComponent
    }
];
