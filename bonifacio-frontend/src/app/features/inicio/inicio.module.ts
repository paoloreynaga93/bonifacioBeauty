import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InicioComponent } from './inicio.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: InicioComponent }
    ]),
    SharedModule
  ]
})
export class InicioModule { }
