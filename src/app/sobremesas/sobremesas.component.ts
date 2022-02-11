import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Sobremesa } from '../modelos/sobremesa';
import { SobremesaService } from '../servicios/sobremesa.service';
import { MessageService } from '../servicios/message.service';

@Component({
  selector: 'app-sobremesas',
  templateUrl: './sobremesas.component.html',
  styleUrls: ['./sobremesas.component.css']
})
export class SobremesasComponent implements OnInit {
  sobremesasOBJ: Sobremesa[];
  sobremesasApi = null;
  sobremesaTmp: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private sobremesaService: SobremesaService,
    private messageService: MessageService
  ) {}

  getSobremesasApi() {
    this.messageService.add('Mostrando Sobremesas');
    this.sobremesaService.getSobremesasApi().subscribe(sobremesasOBJ => {
      this.sobremesasApi = sobremesasOBJ;
      this.sobremesasOBJ = this.sobremesasApi;
      this.sobremesaTmp = this.sobremesasOBJ.map((x: Sobremesa) => {
        return new Sobremesa(
          x._modelo,
          x._fecha_montaje,
          x._fecha_garantia,
          x._precio_del_pc,
          x._cantidad,
          x._RAM,
          x._disco_duro,
          x._refrig_liquida,
          x._comprador
        );
      });
    });
  }

  delete(sobremesa: Sobremesa): void {
    this.sobremesasOBJ = this.sobremesasOBJ.filter(h => h !== sobremesa);
    this.sobremesaService.deleteSobremesa(sobremesa).subscribe();
    console.log(sobremesa);
  }

  add(
    modelo: string,
    fecha_montaje: string,
    fecha_garantia: string,
    precio_del_pc: string,
    cantidad: string,
    RAM: string,
    disco_duro: string,
    refrig_liquida: string,
    comprador: string
  ): void {
    const modeloV = modelo.trim();
    const fecha_montajeV = new Date(fecha_montaje);
    const fecha_garantiaV = new Date(fecha_garantia);
    const precio_del_pcV = parseInt(precio_del_pc);
    const cantidadV = parseInt(cantidad);
    const RAMV = parseInt(RAM);
    const disco_duroV = disco_duro;
    const refrig_liquidaV = refrig_liquida;
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
      refrig_liquida: refrig_liquidaV,
      comprador: compradorV
    };
    this.sobremesaService.nuevoSobremesaPost(newDoc).subscribe(sobremesa => {
      this.sobremesaTmp = sobremesa;
      this.sobremesasOBJ.push(this.sobremesaTmp);
    });
  }
  ngOnInit() {
    this.getSobremesasApi();
  }
  goBack(): void {
    this.location.back();
  }
}
