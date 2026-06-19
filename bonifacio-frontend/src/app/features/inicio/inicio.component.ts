import { Component, OnInit } from '@angular/core';
import { ApiService, Categoria, Contacto, PaginaInicio, Promocion } from '../../core/services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  paginaInicio: PaginaInicio | null = null;
  promociones: Promocion[] = [];
  categorias: Categoria[] = [];
  contacto: Contacto | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadInicioData();
    this.loadPromociones();
    this.loadCategorias();
    this.loadContacto();
  }

  loadInicioData() {
    this.apiService.getInicio().subscribe({
      next: (data) => this.paginaInicio = data,
      error: (err) => console.error('Error loading inicio data:', err)
    });
  }

  loadPromociones() {
    this.apiService.getPromociones().subscribe({
      next: (data) => this.promociones = data.slice(0, 3),
      error: (err) => console.error('Error loading promociones:', err)
    });
  }

  loadCategorias() {
    this.apiService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error loading categorias:', err)
    });
  }

  loadContacto() {
    this.apiService.getContacto().subscribe({
      next: (data) => this.contacto = data,
      error: (err) => console.error('Error loading contacto:', err)
    });
  }

  scrollToContacto() {
    const el = document.getElementById('encuentranos');
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  getHeroBackground(): string {
    const heroImage = this.paginaInicio?.fotoPortadaUrl ||
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920';
    return `linear-gradient(135deg, rgba(233, 30, 99, 0.75), rgba(194, 24, 91, 0.55)), url('${heroImage}')`;
  }
}
