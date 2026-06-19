import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Servicio, Categoria } from '../../core/services/api.service';

@Component({
  selector: 'app-servicio-detalle',
  templateUrl: './servicio-detalle.component.html',
  styleUrls: ['./servicio-detalle.component.css']
})
export class ServicioDetalleComponent implements OnInit {
  servicio: Servicio | null = null;
  categoria: Categoria | null = null;
  serviciosRelacionados: Servicio[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadServicio(parseInt(id));
    }
  }

  loadServicio(id: number) {
    this.apiService.getServicioById(id).subscribe({
      next: (data) => {
        this.servicio = data;
        this.categoria = data.categoria;
        this.loadServiciosRelacionados(data.categoriaId);
      },
      error: (err) => console.error('Error loading servicio:', err)
    });
  }

  loadServiciosRelacionados(categoriaId: number) {
    this.apiService.getServiciosByCategoria(categoriaId).subscribe({
      next: (data) => {
        this.serviciosRelacionados = data.filter(s => s.id !== this.servicio?.id).slice(0, 4);
      },
      error: (err) => console.error('Error loading servicios relacionados:', err)
    });
  }

  openWhatsApp() {
    const message = `Hola, me gustaría reservar el servicio: ${this.servicio?.nombre}`;
    const url = `https://wa.me/39123456789?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
