import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comprador } from '../modelos/comprador';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompradorService {
  private url1 = 'https://restapi-arintec.herokuapp.com/compradores/'; //lookup normal
  private url2 = 'https://restapi-arintec.herokuapp.com/compradorN'; //Añade un comprador nuevo 
  private url3 = 'https://restapi-arintec.herokuapp.com/comprador'; //Hace un lookup de ambas colecciones agrupando por nombre del comprador
  private url5 = 'https://restapi-arintec.herokuapp.com/compradormod'; //Actualiza comprador
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  requestoptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getCompradoresApi() {
    this.messageService.add('Cargamos los documentos');
    return this.http.get(this.url1);
  }

  //PUT: actualiza el comprador pasandole el nombre comprador
  updateComprador(doc: any) {
    console.log('en update');
    console.log(doc);
    const url2Id = `${this.url5}/${doc.nombre_comprador}`;
    return this.http.put(url2Id, doc);
  }

  //DELETE
  deleteComprador(comprador: Comprador) {
    const url2Id = `https://restapi-arintec.herokuapp.com/compradorB/${comprador._nombre_comprador}`;
    return this.http.delete(url2Id);
  }
  //POST
  nuevoCompradorPost(doc: any) {
    return this.http.post(this.url2, doc);
  }

  getComprador(_nombre_comprador: string): Observable<any>{
    const url3id = `https://restapi-arintec.herokuapp.com/comprador/${_nombre_comprador}`;
    return this.http.get(url3id, this.requestoptions);
  }
}