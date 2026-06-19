import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';

import { InicioModule } from './features/inicio/inicio.module';
import { PromocionesModule } from './features/promociones/promociones.module';
import { ServiciosModule } from './features/servicios/servicios.module';
import { NosotrosModule } from './features/nosotros/nosotros.module';
import { UbicacionModule } from './features/ubicacion/ubicacion.module';
import { ServicioDetalleModule } from './features/servicio-detalle/servicio-detalle.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'inicio', loadChildren: () => import('./features/inicio/inicio.module').then(m => m.InicioModule) },
      { path: 'promociones', loadChildren: () => import('./features/promociones/promociones.module').then(m => m.PromocionesModule) },
      { path: 'servicios', loadChildren: () => import('./features/servicios/servicios.module').then(m => m.ServiciosModule) },
      { path: 'nosotros', loadChildren: () => import('./features/nosotros/nosotros.module').then(m => m.NosotrosModule) },
      { path: 'ubicacion', loadChildren: () => import('./features/ubicacion/ubicacion.module').then(m => m.UbicacionModule) },
      { path: 'servicio/:id', loadChildren: () => import('./features/servicio-detalle/servicio-detalle.module').then(m => m.ServicioDetalleModule) },
      { path: '**', redirectTo: '/inicio' }
    ]),
    CoreModule,
    SharedModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
