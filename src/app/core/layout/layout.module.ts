import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class LayoutModule { }
