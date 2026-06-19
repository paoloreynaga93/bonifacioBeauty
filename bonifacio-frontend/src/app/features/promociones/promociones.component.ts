import { Component, OnInit } from '@angular/core';
import { ApiService, Promocion } from '../../core/services/api.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  promociones: Promocion[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadPromociones();
  }

  loadPromociones() {
    this.apiService.getPromociones().subscribe({
      next: (data) => this.promociones = data,
      error: (err) => console.error('Error loading promociones:', err)
    });
  }
}
