import { Component, OnInit } from '@angular/core';
import { Comprador } from '../modelos/comprador';
import { CompradorService } from '../servicios/comprador.service';
import { Ordenador } from '../modelos/ordenador';

@Component({
  selector: 'app-compradores',
  templateUrl: './compradores.component.html',
  styleUrls: ['./compradores.component.css']
})
export class CompradoresComponent implements OnInit {
  compradores: Array<Comprador> = [];
  compradoresApi = null;
  compradorTmp: any;
  constructor(
    private compradorService: CompradorService,
  ) {}

  getCompradoresApi() {
    this.compradorService.getCompradoresApi().subscribe(compradores => {
      this.compradoresApi = compradores;
      for (let comprador of this.compradoresApi) {
        let ordenadores: Array<Ordenador> = new Array();
        for (let ordenador of comprador._ordenadores_comprados) {
          let o = new Ordenador(
            ordenador._modelo,
            ordenador._fecha_montaje,
            ordenador._fecha_garantia,
            ordenador._precio_del_pc,
            ordenador._cantidad,
            ordenador._RAM,
            ordenador._disco_duro,
            ordenador._comprador
          );
          ordenadores.push(o);
        }
        let c = new Comprador(
          comprador._nombre_comprador,
          comprador._presupuesto,
          comprador._n_telefono,
          ordenadores
        );
        this.compradores.push(c);
      }
    });
  }

  add(
    nombre_comprador: string,
    presupuesto: string,
    n_telefono: string
  ): void {
    const nombre_compradorV = nombre_comprador.trim();
    const presupuestoV = parseInt(presupuesto);
    const n_telefonoV = parseInt(n_telefono);

    if (!nombre_comprador) {
      return;
    }
    const newDoc: any = {
      nombre_comprador: nombre_compradorV,
      presupuesto: presupuestoV,
      n_telefono: n_telefonoV
    };
    this.compradorService.nuevoCompradorPost(newDoc).subscribe(comprador => {
      this.compradorTmp = comprador;
      this.compradores.push(this.compradorTmp);
    });
  }
  delete(comprador: Comprador): void {
    this.compradores = this.compradores.filter(h => h !== comprador);
    this.compradorService.deleteComprador(comprador).subscribe();
    console.log(comprador);
  }
  ngOnInit() {
    this.getCompradoresApi();
  }
}