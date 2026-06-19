import { Component, OnInit } from '@angular/core';
import { ApiService, Parametro } from '../../core/services/api.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  nosotrosText: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getParametros(1, 'nosotros').subscribe({
      next: (parametros) => {
        if (parametros && parametros.length > 0) {
          this.nosotrosText = parametros[0].valor1;
        }
      },
      error: (error) => {
        console.error('Error al obtener parámetros:', error);
      }
    });
  }
}
