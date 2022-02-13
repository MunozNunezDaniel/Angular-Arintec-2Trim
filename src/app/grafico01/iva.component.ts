import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Ordenador } from '../modelos/ordenador';
import { Comprador } from '../modelos/comprador';
import { OrdenadorService } from '../servicios/ordenador.service';
import { CompradorService } from 'app/servicios/comprador.service';

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
    
    //Update options after renders
    title: {
        text: 'Precio Total de los pedidos realizados por cada cliente con IVA'
    },
    subtitle: {
        text: '21% IVA'
    },
    //Clientes (nombre_comprador)
    xAxis: {
        categories: []
    },
    //iva()
    yAxis: {
      accessibility: {},
      title: {
        text: 'Precio €'
      }
    },
    series: [{
      name: 'Gasto total',
      type: 'column',
      colorByPoint: true,
      data: [],
      showInLegend: false
    }
  ]
};

constructor(
  private ordenadorService: OrdenadorService,
  private compradorService: CompradorService
  ) {}

ngOnInit() {
  this.getMisDatos();
}

iva(precio_del_pc: number, cantidad: number) {
  let precioiva: number =
      (precio_del_pc * 0.21 + precio_del_pc) * cantidad;
    return precioiva;
}

getMisDatos() {
  this.compradorService.getCompradoresApi().subscribe(
    result => {
      const misDatos = result as Array<Comprador>;
      let dataCategorias = Array<String>();
      let dataSeries = Array<Number>()
      misDatos.forEach(comprador => {
        dataCategorias.push(comprador._nombre_comprador);
        let total: number = 0;
        let ordenadores: Array<Ordenador> = comprador._ordenadores_comprados;
        ordenadores.forEach(ordenador => {
          total = total + this.iva(ordenador._precio_del_pc, ordenador._cantidad);
        });
        dataSeries.push(total);
      });
      this.chartOptions.series[0]['data'] = dataSeries;
      this.chartOptions.xAxis['categories'] = dataCategorias;
      Highcharts.chart('miGrafico01', this.chartOptions);
    },
    error => console.log(error)
  );
}
/*
getMisDatos() {
  this.ordenadorService.getOrdenadoresApi().subscribe(
    result => {
      const misDatos: any = result;
      const dataSeries = misDatos.map((x: Ordenador) => x._precio_del_pc);
      const dataCategorias = misDatos.map((x: Comprador) => x._nombre_comprador);
      console.log(dataCategorias);
      this.chartOptions.series[0]['data'] = dataSeries;
      this.chartOptions.xAxis['categories'] = dataCategorias;
      Highcharts.chart('miGrafico01', this.chartOptions);
    },
    error => console.log(error)
  );
}
*/
}