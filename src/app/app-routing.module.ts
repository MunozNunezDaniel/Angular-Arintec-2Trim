import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompradoresComponent } from './compradores/compradores.component';
import { Grafico01Component } from './grafico01/iva.component';
import { Grafico02Component } from './grafico02/garantia.component';
import { OrdenadoresComponent } from './ordenadores/ordenadores.component';
import { CompradorDetailComponent } from './comprador-detail/comprador-detail.component';
import { OrdenadorDetailComponent } from './ordenador-detail/ordenador-detail.component';

const routes: Routes = [
  { path: 'compradores', component: CompradoresComponent },
  { path: 'grafico01', component: Grafico01Component },
  { path: 'grafico02', component: Grafico02Component },
  { path: 'ordenadores', component: OrdenadoresComponent },
  { path: 'comprador/:identif', component: CompradorDetailComponent },
  { path: 'ordenador/:modelo', component: OrdenadorDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

