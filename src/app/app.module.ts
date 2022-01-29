import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CompradorDetailComponent } from './comprador-detail/comprador-detail.component';
import { CompradoresComponent } from './compradores/compradores.component';
//import { Grafico01Component } from './grafico01/grafico01.component';
//import { Grafico02Component } from './grafico02/grafico01.component';
import { MessageService } from './message.service';
import { OrdenadorDetailComponent } from './ordenador-detail/ordenador-detail.component';
import { OrdenadoresComponent } from './ordenadores/ordenadores.component';
import { CompradorService } from './comprador.service';
import { OrdenadorService } from './ordenador.service';
//Añadir los servicios de comprador y ordenador

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
    //Grafico01Component,
    //Grafico02Component,
    OrdenadorDetailComponent,
    OrdenadoresComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    MessageService,
    OrdenadorService,
    CompradorService
    //poner aqui los servicios para enlazarlos
  ]
})
export class AppModule {}
