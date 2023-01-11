import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UiCardComponent } from 'src/app/shared/components/ui-card/ui-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
];

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    UiCardComponent,
    SharedModule
  ]
})
export class WelcomeModule { }
