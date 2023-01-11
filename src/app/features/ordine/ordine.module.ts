import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrdineComponent } from './list-ordine/list-ordine.component';
import { DetailOrdineComponent } from './detail-ordine/detail-ordine.component';
import { DialogComponent } from './dialog/dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'list',
    component: ListOrdineComponent
  },

  {
    path: ':id',
    component: DetailOrdineComponent
  },

  {
    path: 'create',
    component: DetailOrdineComponent
  },

  {
    path: 'edit/:id',
    component: DetailOrdineComponent
  },

  {
    path: 'search',
    component: DetailOrdineComponent
  },

  {
    path: 'report',
    component: DetailOrdineComponent
  },

  {
    path: 'statistiche',
    component: DetailOrdineComponent
  },

  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }


];

@NgModule({
  declarations: [
    ListOrdineComponent,
    DetailOrdineComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class OrdineModule { }
