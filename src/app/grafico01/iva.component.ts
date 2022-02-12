import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Ordenador } from '../modelos/ordenador';
import { Comprador } from '../modelos/comprador';
import { OrdenadorService } from '../servicios/ordenador.service';
import { CompradorService } from '../servicios/comprador.service';
import { MessageService } from '../servicios/message.service';

@Component({
    selector: 'app-grafico01',
    templateUrl: './iva.component.html',
    styleUrls: ['./iva.component.css']
  })
  export class Grafico01Component implements OnInit {
    Highcharts: typeof Highcharts = Highcharts;
    ordenadores: Ordenador[];
    comprador: Comprador[];
    ordenadoresApi = null;
    ordenadorTmp: any;
  
    chartOptions: Highcharts.Options = {
      title: {
          text: 'Precios Total de los pedidos realizados por cada cliente con IVA'
      },
      subtitle: {
          text: '21% IVA'
      },
      xAxis: {
          categories: []
      },
      yAxis: {
        accessibility: {},
        title: {
          text: 'Precio'
        }
      },
      series: [{
          type: 'column',
          colorByPoint: true,
          data: [],
          showInLegend: false
      }]
  };
  
    constructor(private ordenadorService: OrdenadorService) {}
  
    ngOnInit() {
      this.getMisDatos();
    }
  
    getMisDatos() {
      this.ordenadorService.getOrdenadoresApi().subscribe(
        result => {
          const misDatos: any = result;
          const dataSeries = misDatos.map((s: Ordenador) => s.iva());
          console.log(dataSeries);
          const dataCategorias = misDatos.map((x: Comprador) => x._nombre_comprador);
          this.chartOptions.series[0]['data'] = dataSeries;
          this.chartOptions.xAxis['categories'] = dataCategorias;
          Highcharts.chart('miGrafico01', this.chartOptions);
        },
        error => console.log(error)
      );
    }
  }