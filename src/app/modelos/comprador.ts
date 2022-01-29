import { Ordenador } from './ordenador';
export class Comprador {
  _identif: string;
  _nombre_comprador: string;
  _presupuesto: number;
  _n_telefono: number;
  _ordenadores: Array<Ordenador>;

  constructor(
    identif: string,
    nombre_comprador: string,
    presupuesto: number,
    n_telefono: number,
    ordenadores: Array<Ordenador>
  ) {
    this._identif = identif;
    this._nombre_comprador = nombre_comprador;
    this._presupuesto = presupuesto;
    this._n_telefono = n_telefono;
    this._ordenadores = ordenadores;
  }
}
