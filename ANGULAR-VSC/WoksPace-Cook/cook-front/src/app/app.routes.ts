import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/components/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/components/cliente-create/cliente-create.component';
import { ClienteEditComponent } from './components/components/cliente-edit/cliente-edit.component';
import { LoginComponent } from './components/components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { BlogComponent } from './pages/blog/blog.component';
import { MenuComponent } from './components/components/menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/blog',
        pathMatch: 'full'
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard]  // Evita que usuarios ya autenticados accedan al login
    },
    {
        path: 'menu',
        component: MenuComponent,
        canActivate: [authGuard]
    },
    {
        path: 'clientes',
        component: ClienteListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'cliente/create',
        component: ClienteCreateComponent,
        canActivate: [authGuard]
    },
    {
        path: 'cliente/edit/:id',
        component: ClienteEditComponent,
        canActivate: [authGuard]
    }
];