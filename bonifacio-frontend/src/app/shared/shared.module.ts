import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioCardComponent } from './components/servicio-card/servicio-card.component';
import { PromocionCardComponent } from './components/promocion-card/promocion-card.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';

@NgModule({
  declarations: [
    ServicioCardComponent,
    PromocionCardComponent,
    WhatsappButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ServicioCardComponent,
    PromocionCardComponent,
    WhatsappButtonComponent
  ]
})
export class SharedModule { }
