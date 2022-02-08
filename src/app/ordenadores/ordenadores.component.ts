import { Component, OnInit } from '@angular/core';
import { Ordenador } from '../modelos/ordenador';
import { OrdenadorService } from '../servicios/ordenador.service';
import { MessageService } from '../servicios/message.service';


@Component({
  selector: 'app-ordenadores',
  templateUrl: './ordenadores.component.html',
  styleUrls: ['./ordenadores.component.css']
})
export class OrdenadoresComponent implements OnInit {
  ordenadoresOBJ: Ordenador[];
  ordenadoresApi = null;
  ordenadorTmp: any;

  constructor(
    private ordenadorService: OrdenadorService,
    private messageService: MessageService
  ) {}

  getOrdenadoresApi() {
    this.messageService.add('Mostrando Ordenadores');
    this.ordenadorService.getOrdenadoresApi().subscribe(ordenadoresOBJ => {
      this.ordenadoresApi = ordenadoresOBJ;
      this.ordenadoresOBJ = this.ordenadoresApi;
      this.ordenadorTmp = this.ordenadoresOBJ.map((x: Ordenador) => {
        return new Ordenador(
          x._modelo,
          x._fecha_montaje,
          x._fecha_garantia,
          x._precio_del_pc,
          x._cantidad,
          x._RAM,
          x._disco_duro,
          x._comprador
        );
      });
    });
  }

  delete(ordenador: Ordenador): void {
    this.ordenadoresOBJ = this.ordenadoresOBJ.filter(h => h !== ordenador);
    this.ordenadorService.deleteOrdenador(ordenador).subscribe();
    console.log(ordenador);
  }

  add(
    modelo: string,
    fecha_montaje: string,
    fecha_garantia: string,
    precio_del_pc: string,
    cantidad: string,
    RAM: string,
    disco_duro: string,
    comprador: string
  ): void {
    const modeloV = modelo.trim();
    const fecha_montajeV = new Date(fecha_montaje);
    const fecha_garantiaV = new Date(fecha_garantia);
    const precio_del_pcV = parseInt(precio_del_pc);
    const cantidadV = parseInt(cantidad);
    const RAMV = parseInt(RAM);
    const disco_duroV = disco_duro;
    const compradorV = comprador;
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
      disco_duro: disco_duroV,
      comprador: compradorV
    };
    this.ordenadorService.nuevoOrdenadorPost(newDoc).subscribe(ordenador => {
      this.ordenadorTmp = ordenador;
      this.ordenadoresOBJ.push(this.ordenadorTmp);
    });
  }
  ngOnInit() {
    this.getOrdenadoresApi();
  }
}
