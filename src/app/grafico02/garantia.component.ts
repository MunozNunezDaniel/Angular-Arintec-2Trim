import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Ordenador } from '../modelos/ordenador';
import { OrdenadorService } from '../servicios/ordenador.service';

@Component({
  selector: 'app-grafico02',
  templateUrl: './garantia.component.html',
  styleUrls: ['./garantia.component.css']
})
export class Grafico02Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  ordenadores: Ordenador[];
  ordenadoresApi = null;
  ordenadorTmp: any;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Dias restantes para el fin de la garantía'
    },
    yAxis: {
      accessibility: {},
      title: {
        text: 'Días'
      }
    },
    colors: ['#FF0400'],
    xAxis: {
      accessibility: {},
      title: {
        text: 'Modelos'
      }
    },
    series: [
      {
        type: 'area',
        data: [],
        name: 'Días para que Acabe la garantía',
        lineColor: '#FF0400'
      }
    ],

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      backgroundColor: '#FF04'
    }
  };

  constructor(private ordenadorService: OrdenadorService) {}

  ngOnInit() {
    this.getMisDatos();
  }

  getMisDatos() {
    this.ordenadorService.getOrdenadoresApi().subscribe(
      result => {
        const misDatos: Array<Ordenador> = [];
        let api = null;
        api = result;
        for (let x of api) {
          let O = new Ordenador(
            x._modelo,
            x._fecha_montaje,
            x._fecha_garantia,
            x._precio_del_pc,
            x._cantidad,
            x._RAM,
            x._disco_duro,
            x._comprador
          );
          misDatos.push(O);
        }
        const dataSeries = misDatos.map((x: Ordenador) => x.dias());
        const dataCategorias = misDatos.map((x: Ordenador) => x._modelo);
        this.chartOptions.series[0]['data'] = dataSeries;
        this.chartOptions.xAxis['categories'] = dataCategorias;
        Highcharts.chart('miGrafico02', this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
