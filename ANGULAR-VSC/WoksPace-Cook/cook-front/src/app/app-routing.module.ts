import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ClienteListComponent } from './components/components/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/components/cliente-create/cliente-create.component';
import { ClienteEditComponent } from './components/components/cliente-edit/cliente-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'clientes', pathMatch: 'full' },
    { path: 'clientes', component: ClienteListComponent },
    { path: 'cliente/create', component: ClienteCreateComponent },
    { path: 'cliente/edit/:id', component: ClienteEditComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }