import { Component, OnInit, Input } from '@angular/core';
import { Ordenador } from '../modelos/ordenador';
import { OrdenadorService } from '../servicios/ordenador.service';
import { MessageService } from '../servicios/message.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ordenador-detail',
  templateUrl: './ordenador-detail.component.html',
  styleUrls: ['./ordenador-detail.component.css']
})
export class OrdenadorDetailComponent implements OnInit {
  // @Input() and @Output() allow Angular to share data between the parent context and child directives or components
  ordenador: Ordenador;

  constructor(
    private ordenadorService: OrdenadorService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getOrdenador();
  }
  save(_precio: string): void {
    const doc = {
      modelo: this.ordenador._modelo,
      fecha_montaje: new Date (this.ordenador._fecha_montaje),
      fecha_garantia: new Date(this.ordenador._fecha_garantia),
      precio_del_pc: parseInt(_precio),
      cantidad: this.ordenador._cantidad,
      RAM: this.ordenador._RAM,
      disco_duro: this.ordenador._disco_duro,
      comprador: this.ordenador._comprador
    };
    this.ordenadorService.updateOrdenador(doc).subscribe(() => this.goBack());
  }
  
  // Para recuperar el documento por el Id recibido como parámetro
  
  getOrdenador(): void {
    const modelo = this.route.snapshot.paramMap.get('modelo');
    this.messageService.add(
      `OrdenadoresComponent: Selected ordenador=${modelo}`
    );
    this.ordenadorService.getOrdenador(modelo).subscribe(ordenador => {
      const ordenadorTmp: any = ordenador;
      this.ordenador = ordenadorTmp[0];
    });
  }
  goBack(): void {
    this.location.back();
  }
}

