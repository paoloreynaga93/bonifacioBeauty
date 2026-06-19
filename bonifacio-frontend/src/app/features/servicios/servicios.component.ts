import { Component, OnInit } from '@angular/core';
import { ApiService, Categoria } from '../../core/services/api.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.apiService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error loading categorias:', err)
    });
  }
}
