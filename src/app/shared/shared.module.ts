import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { IsUserLoggedDirective } from './directives/is-user-logged.directive';
import { IfRoleDirective } from './directives/if-role.directive';
import { SnackbarComponent } from './snackbar/snackbar.component';



@NgModule({
  declarations: [
    IsUserLoggedDirective,
    IfRoleDirective,
    SnackbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    IsUserLoggedDirective,
    IfRoleDirective,
    SnackbarComponent
  ]
})
export class SharedModule { }
