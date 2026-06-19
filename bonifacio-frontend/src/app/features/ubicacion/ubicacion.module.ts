import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UbicacionComponent } from './ubicacion.component';

@NgModule({
  declarations: [
    UbicacionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UbicacionComponent }
    ])
  ]
})
export class UbicacionModule { }
