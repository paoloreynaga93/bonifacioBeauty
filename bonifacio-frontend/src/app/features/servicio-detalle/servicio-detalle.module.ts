import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ServicioDetalleComponent } from './servicio-detalle.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ServicioDetalleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ServicioDetalleComponent }
    ]),
    SharedModule
  ]
})
export class ServicioDetalleModule { }
