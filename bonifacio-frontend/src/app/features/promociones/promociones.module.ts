import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PromocionesComponent } from './promociones.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PromocionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PromocionesComponent }
    ]),
    SharedModule
  ]
})
export class PromocionesModule { }
