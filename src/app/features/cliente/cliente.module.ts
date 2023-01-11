import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClienteComponent } from './list-cliente/list-cliente.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { DetailClienteComponent } from './detail-cliente/detail-cliente.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListClienteComponent
  },

  {
    path: ':id',
    component: DetailClienteComponent
  },

  {
    path: 'create',
    component: DetailClienteComponent
  },

  {
    path: 'edit/:id',
    component: DetailClienteComponent
  },

  {
    path: 'search',
    component: DetailClienteComponent
  },

  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }


];

@NgModule({
  declarations: [
    ListClienteComponent,
    DialogComponent,
    DetailClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class ClienteModule { }
