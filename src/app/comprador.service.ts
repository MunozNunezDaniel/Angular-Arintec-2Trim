import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Comprador } from './modelos/comprador';

@Injectable({ providedIn: 'root' })
export class CompradorService {
  private url1 = 'https://restapi-arintec.herokuapp.com/compradores/'; //lookup normal
  private url2 = 'https://restapi-arintec.herokuapp.com/compradorN'; //Añade un comprador nuevo
  private url4 = 'https://restapi-arintec.herokuapp.com/ordenadorN'; //Añade un ordenador nuevo
  private url5 = 'https://restapi-arintec.herokuapp.com/comprador/compradormod'; //Actualiza comprador
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getCompradoresApi() {
    this.messageService.add('Cargamos los documentos');
    return this.http.get(this.url1);
  }

  /** PUT: update the hero by ID on the server */
  updateComprador(doc: any) {
    console.log('en update');
    console.log(doc);
    const url2Id = `${this.url5}/${doc.identif}`;
    return this.http.put(url2Id, doc);
  }

  //return this.http.put(url2Id, doc);

  /** DELETE*/
  deleteComprador(comprador: Comprador) {
    const url2Id = `https://restapi-arintec.herokuapp.com/compradorB/${comprador._identif}`;
    return this.http.delete(url2Id);
  }
  /** POST*/
  nuevoCompradorPost(doc: any) {
    return this.http.post(this.url2, doc);
  }
  nuevoProductoPost(doc: any) {
    return this.http.post(this.url4, doc);
  }

  getComprador(_identif: string) {
    const url1id = `https://restapi-arintec.herokuapp.com/compradoresT`;
    return this.http.get(url1id);
  }
}
