import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
