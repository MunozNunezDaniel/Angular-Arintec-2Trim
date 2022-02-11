import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Portatil } from '../modelos/portatil';
import { MessageService } from './message.service';

/*
Los componentes consumen servicios; es decir, puede inyectar un servicio en un componente, dándole acceso al componente a ese servicio.

Una aplicación real buscará héroes de un servidor remoto, que es una operación inherentemente asincrónica.

Un Portatil de múltiples valores, que empuja a suscriptores. Se utiliza para el manejo de eventos asíncronos en todo Angular. 
Ejecutas un observable suscribiéndote con su método subscribe(), pasando devoluciones de llamada para notificaciones de nuevos valores, errores o finalización.
*/

@Injectable({
  providedIn: 'root'
})
export class PortatilService {
  private url2 = 'https://restapi-arintec.herokuapp.com/ordenadoresT';
  private url3 = 'https://restapi-arintec.herokuapp.com/ordenadormod';
  private url4 = 'https://restapi-arintec.herokuapp.com/ordenadorN';
  private url5 = 'https://restapi-arintec.herokuapp.com/ordenadorB';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getPortatilesApi() {
    this.messageService.add('Cargamos los documentos');
    return this.http.get(this.url2);
  }

  /**update**/
  updatePortatil(doc: any) {
    console.log('en update');
    console.log(doc);
    const url2Id = `${this.url3}/${doc.modelo}`;
    return this.http.put(url2Id, doc);
  }

  /** DELETE*/
  deletePortatil(portatil: Portatil) {
    const url5 = `https://restapi-arintec.herokuapp.com/ordenadorB/${portatil._modelo}`;
    return this.http.delete(url5);
  }
  
  /** POST **/
  nuevoPortatilPost(doc: any) {
    return this.http.post(this.url4, doc);
  }

  /*Portatil por su modelo */
  getPortatil(modelo: string) {
    const url2 = `https://restapi-arintec.herokuapp.com/ordenador/${modelo}`;
    return this.http.get(url2);
  }
}
