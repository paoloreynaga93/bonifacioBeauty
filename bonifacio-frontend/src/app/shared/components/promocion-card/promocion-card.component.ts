import { Component, Input } from '@angular/core';
import { Promocion } from '../../../core/services/api.service';

@Component({
  selector: 'app-promocion-card',
  templateUrl: './promocion-card.component.html',
  styleUrls: ['./promocion-card.component.css']
})
export class PromocionCardComponent {
  @Input() promocion!: Promocion;
}
