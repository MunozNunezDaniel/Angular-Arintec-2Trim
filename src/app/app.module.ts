import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { CompradorDetailComponent } from './comprador-detail/comprador-detail.component';
import { CompradoresComponent } from './compradores/compradores.component';
import { Grafico01Component } from './grafico01/iva.component';
import { Grafico02Component } from './grafico02/garantia.component';
import { MessageService } from './servicios/message.service';
import { OrdenadorDetailComponent } from './ordenador-detail/ordenador-detail.component';
import { OrdenadoresComponent } from './ordenadores/ordenadores.component';
import { CompradorService } from './servicios/comprador.service';
import { OrdenadorService } from './servicios/ordenador.service';
import { PortatilesComponent } from './portatiles/portatiles.component';
import { SobremesasComponent } from './sobremesas/sobremesas.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  declarations: [
    AppComponent,
    CompradorDetailComponent,
    CompradoresComponent,
    Grafico01Component,
    Grafico02Component,
    OrdenadorDetailComponent,
    OrdenadoresComponent,
    PortatilesComponent,
    SobremesasComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' },
    MessageService,
    OrdenadorService,
    CompradorService
  ],
})
export class AppModule {}
