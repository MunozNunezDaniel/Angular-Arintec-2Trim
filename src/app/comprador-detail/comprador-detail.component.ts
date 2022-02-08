import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comprador } from '../modelos/comprador';
import { Ordenador } from '../modelos/ordenador';
import { CompradorService } from '../servicios/comprador.service';
import { OrdenadorService} from '../servicios/ordenador.service';
import { Location } from '@angular/common';
import { MessageService } from '../servicios/message.service';

@Component({
  selector: 'app-comprador-detail',
  templateUrl: './comprador-detail.component.html',
  styleUrls: ['./comprador-detail.component.css']
})
export class CompradorDetailComponent implements OnInit {
  comprador: Comprador;
  ordenador: Ordenador;

  constructor(
    private route: ActivatedRoute,
    private compradorService: CompradorService,
    private ordenadorService: OrdenadorService,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getComprador();
  }

  save(_identif: string): void {
    const doc = {
      identif: this.comprador._identif,
      nombre_comprador: this.comprador._nombre_comprador,
      presupuesto: this.comprador._presupuesto,
      n_telefono: this.comprador._n_telefono
    };
    this.compradorService.updateComprador(doc).subscribe(() => this.goBack());
  }
/*
  getComprador(): void {
    const nombre_comprador = this.route.snapshot.paramMap.get('nombre_comprador');
    this.messageService.add(
      `CompradoresComponent: Selected comprador=${nombre_comprador}`
    );
    this.compradorService.getComprador(nombre_comprador).subscribe(comprador => {
      const compradorTmp: any = comprador;
      this.comprador = compradorTmp[0];
    });
  }
  */
  getComprador(): void {
    let nombre_comprador = this.route.snapshot.paramMap.get('nombre_comprador');
    this.compradorService.getComprador(nombre_comprador).subscribe(s => {
      this.comprador = s as Comprador;
      let ordenadores: Array<Ordenador> = new Array();
      for (let ordenador of this.comprador.ordenadores) {
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
    this.ordenadorService.nuevoOrdenadorPost(newDoc).subscribe(ordenador => {
      const ordenadorTmp: any = newDoc;
      this.ordenador._ordenadores.push(ordenadorTmp);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
