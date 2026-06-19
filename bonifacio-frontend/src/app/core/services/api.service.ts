import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionMin: number;
  categoriaId: number;
  categoria: Categoria;
  fotoUrl?: string;
  activo: boolean;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  icono?: string;
  fotoUrl?: string;
  servicios?: Servicio[];
}

export interface Promocion {
  id: number;
  titulo: string;
  descripcion: string;
  descuento: number;
  fotoUrl: string;
  activo: boolean;
}

export interface Contacto {
  id: number;
  direccion: string;
  telefono: string;
  email: string;
  horario: string;
}

export interface PaginaInicio {
  id: number;
  tituloPrincipal: string;
  subtitulo: string;
  fotoPortadaUrl: string;
}

export interface Parametro {
  id: number;
  descripcion: string;
  clave: string;
  valor1: string;
  valor2?: string;
  grupo: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = this.buildApiUrl();

  constructor(private http: HttpClient) { }

  private buildApiUrl(): string {
    const host = window.location.hostname || 'localhost';
    return `http://${host}:3000/api`;
  }

  // Servicios
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/servicios`);
  }

  getServicioById(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/servicios/${id}`);
  }

  getServiciosByCategoria(categoriaId: number): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/servicios/categoria/${categoriaId}`);
  }

  // Categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }

  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/categorias/${id}`);
  }

  // Promociones
  getPromociones(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(`${this.apiUrl}/promociones`);
  }

  getPromocionById(id: number): Observable<Promocion> {
    return this.http.get<Promocion>(`${this.apiUrl}/promociones/${id}`);
  }

  // Contacto
  getContacto(): Observable<Contacto> {
    return this.http.get<Contacto>(`${this.apiUrl}/contacto`);
  }

  // Inicio
  getInicio(): Observable<PaginaInicio> {
    return this.http.get<PaginaInicio>(`${this.apiUrl}/inicio`);
  }

  // Parámetros
  getParametros(grupo?: number, clave?: string): Observable<Parametro[]> {
    const params: any = {};
    if (grupo) params.grupo = grupo;
    if (clave) params.clave = clave;
    return this.http.get<Parametro[]>(`${this.apiUrl}/parametros`, { params });
  }
}
