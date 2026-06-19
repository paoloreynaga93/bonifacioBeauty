import { Component, OnInit } from '@angular/core';
import { ApiService, Contacto } from '../../core/services/api.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  contacto: Contacto | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadContacto();
  }

  loadContacto() {
    this.apiService.getContacto().subscribe({
      next: (data) => this.contacto = data,
      error: (err) => console.error('Error loading contacto:', err)
    });
  }
}
