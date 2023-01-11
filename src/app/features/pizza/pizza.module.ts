import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPizzaComponent } from './list-pizza/list-pizza.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailPizzaComponent } from './detail-pizza/detail-pizza.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListPizzaComponent
  },

  {
    path: ':id',
    component: DetailPizzaComponent
  },

  {
    path: 'create',
    component: DetailPizzaComponent
  },

  {
    path: 'edit/:id',
    component: DetailPizzaComponent
  },

  {
    path: 'search',
    component: DetailPizzaComponent
  },

  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }


];

@NgModule({
  declarations: [
    ListPizzaComponent,
    DetailPizzaComponent,
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
export class PizzaModule { }
