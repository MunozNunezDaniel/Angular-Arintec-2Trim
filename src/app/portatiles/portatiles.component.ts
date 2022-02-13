import { Component, OnInit } from '@angular/core';
import { Portatil } from '../modelos/portatil';
import { PortatilService } from '../servicios/portatil.service';

@Component({
  selector: 'app-portatiles',
  templateUrl: './portatiles.component.html',
  styleUrls: ['./portatiles.component.css']
})
export class PortatilesComponent implements OnInit {
  portatilesOBJ: Portatil[];
  portatilesApi = null;
  portatilTmp: any;

  constructor(
    private portatilService: PortatilService,
  ) {}

  getPortatilesApi() {
    this.portatilService.getPortatilesApi().subscribe(portatilesOBJ => {
      this.portatilesApi = portatilesOBJ;
      this.portatilesOBJ = Array<Portatil>();
      this.portatilesApi.forEach(portatil => {
        if (portatil._duracion_bateria != null) {
          this.portatilesOBJ.push(portatil);
        }
      });
      this.portatilTmp = this.portatilesOBJ.map((x: Portatil) => {
        return new Portatil(
          x._modelo,
          x._fecha_montaje,
          x._fecha_garantia,
          x._precio_del_pc,
          x._cantidad,
          x._RAM,
          x._disco_duro,
          x._duracion_bateria,
          x._comprador
        );
      });
    });
  }

  delete(portatil: Portatil): void {
    this.portatilesOBJ = this.portatilesOBJ.filter(h => h !== portatil);
    this.portatilService.deletePortatil(portatil).subscribe();
    console.log(portatil);
  }

  add(
    modelo: string,
    fecha_montaje: string,
    fecha_garantia: string,
    precio_del_pc: string,
    cantidad: string,
    RAM: string,
    disco_duro: string,
    duracion_bateria: string,
    comprador: string
  ): void {
    const modeloV = modelo.trim();
    const fecha_montajeV = new Date(fecha_montaje);
    const fecha_garantiaV = new Date(fecha_garantia);
    const precio_del_pcV = parseInt(precio_del_pc);
    const cantidadV = parseInt(cantidad);
    const RAMV = parseInt(RAM);
    const disco_duroV = disco_duro;
    const duracion_bateriaV = parseInt(duracion_bateria);
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
      duracion_bateria: duracion_bateriaV,
      comprador: compradorV
    };
    this.portatilService.nuevoPortatilPost(newDoc).subscribe(portatil => {
      this.portatilTmp = portatil;
      this.portatilesOBJ.push(this.portatilTmp);
    });
  }
  ngOnInit() {
    this.getPortatilesApi();
  }
}
