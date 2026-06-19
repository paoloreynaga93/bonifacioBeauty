import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ServiciosComponent } from './servicios.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ServiciosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ServiciosComponent }
    ]),
    SharedModule
  ]
})
export class ServiciosModule { }
