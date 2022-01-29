import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comprador } from '../modelos/comprador';
import { Ordenador } from '../modelos/ordenador';
import { CompradorService } from '../comprador.service';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-comprador-detail',
  templateUrl: './comprador-detail.component.html',
  styleUrls: ['./comprador-detail.component.css']
})
export class CompradorDetailComponent implements OnInit {
  comprador: Comprador;
  compradorApi = null;

  constructor(
    private route: ActivatedRoute,
    private compradorService: CompradorService,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getComprador();
  }

  getComprador(): void {
    let identif = this.route.snapshot.paramMap.get('identif');
    this.compradorService.getComprador(identif).subscribe(s => {
      this.compradorApi = s;
      let ordenadores: Array<Ordenador> = new Array();
      for (let ordenador of this.compradorApi[0].ordenadores) {
        let p = new Ordenador(
          ordenador._modelo,
          ordenador._fecha_montaje,
          ordenador._fecha_garantia,
          ordenador._precio_del_pc,
          ordenador._cantidad,
          ordenador._RAM,
          ordenador._disco_duro,
          ordenador._comprador
        );
        ordenadores.push(p);
      }
      this.comprador = new Comprador(
        this.compradorApi[0]._identif,
        this.compradorApi[0]._nombre_comprador,
        this.compradorApi[0]._presupuesto,
        this.compradorApi[0]._n_telefono,
        ordenadores
      );
    });
  }

  add(
    modelo: string,
    fecha_montaje: string,
    fecha_garantia: string,
    precio_del_pc: string,
    cantidad: string,
    RAM: string,
    disco_duro: string
  ): void {
    const modeloV = modelo.trim();
    const fecha_montajeV = new Date(fecha_montaje);
    const fecha_garantiaV = new Date(fecha_garantia);
    const precio_del_pcV = parseInt(precio_del_pc);
    const cantidadV = parseInt(cantidad);
    const RAMV = parseInt(RAM);
    const disco_duroV = disco_duro;

    if (!modelo) {
      return;
    }
    const newDoc: any = {
      modelo: modeloV,
      fecha_montaje: fecha_montajeV,
      fecha_garantia: fecha_garantiaV,
      precio_del_pc: precio_del_pcV,
      cantidad: cantidadV,
      RAM: RAMV,
      disco_duro: disco_duroV
    };
    this.compradorService.nuevoCompradorPost(newDoc).subscribe(comprador => {
      const ordenadorTmp: any = newDoc;
      this.comprador._ordenadores.push(ordenadorTmp);
    });
  }
  save(_presupuesto: string): void {
    const doc = {
      identif: this.comprador._identif,
      nombre_comprador: this.comprador._nombre_comprador,
      presupuesto: this.comprador._presupuesto,
      n_telefono: this.comprador._n_telefono
    };
    this.compradorService.updateComprador(doc).subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
