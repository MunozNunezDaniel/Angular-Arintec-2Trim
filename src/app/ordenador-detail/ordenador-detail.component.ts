import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ordenador } from '../modelos/ordenador';
import { Portatil } from '../modelos/portatil';
import { Sobremesa } from '../modelos/sobremesa';
import { OrdenadorService } from '../servicios/ordenador.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-ordenador-detail',
  templateUrl: './ordenador-detail.component.html',
  styleUrls: ['./ordenador-detail.component.css']
})
export class OrdenadorDetailComponent implements OnInit {
  ordenador: Ordenador;
  sobremesa: Sobremesa = null;
  portatil: Portatil = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ordenadorService: OrdenadorService,
  ) {}

  ngOnInit() {
    this.getOrdenador();
  }

  save(_precio: string): void {
    let doc = {
      modelo: this.ordenador._modelo,
      fecha_montaje: new Date (this.ordenador._fecha_montaje),
      fecha_garantia: new Date(this.ordenador._fecha_garantia),
      precio_del_pc: parseInt(_precio),
      cantidad: this.ordenador._cantidad,
      RAM: this.ordenador._RAM,
      disco_duro: this.ordenador._disco_duro,
      duracion_bateria: "" as String,
      refrig_liquida: "" as String,
      comprador: this.ordenador._comprador
    };
    if (this.portatil != null) {
      doc.duracion_bateria = this.portatil._duracion_bateria
    } else {
      doc.refrig_liquida = this.sobremesa._refrig_liquida
    }
    
    this.ordenadorService.updateOrdenador(doc).subscribe(() => this.goBack());
  }
  
  // Para recuperar el documento por el Id recibido como parámetro
  
  getOrdenador(): void {
    const modelo = this.route.snapshot.paramMap.get('modelo');
    this.ordenadorService.getOrdenador(modelo).subscribe(ordenador => {
      const ordenadorTmp: any = ordenador;
      if (ordenadorTmp[0]._duracion_bateria != null) {
        this.portatil = ordenadorTmp[0];
      } else {
        this.sobremesa = ordenadorTmp[0];
      }
      this.ordenador = ordenadorTmp[0];
    });
  }
  goBack(): void {
    this.location.back();
  }
}

