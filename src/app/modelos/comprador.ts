import { Ordenador } from './ordenador';
export class Comprador {
  _nombre_comprador: string;
  _presupuesto: number;
  _n_telefono: number;
  _ordenadores_comprados: Array<Ordenador>;

  constructor(
    nombre_comprador: string,
    presupuesto: number,
    n_telefono: number,
    ordenadores_comprados: Array<Ordenador>
  ) {
    this._nombre_comprador = nombre_comprador;
    this._presupuesto = presupuesto;
    this._n_telefono = n_telefono;
    this._ordenadores_comprados = ordenadores_comprados;
  }
  get nombre_comprador() {
    return this._nombre_comprador;
  }
  get presupuesto() {
    return this._presupuesto;
  }
  get n_telefono() {
    return this._n_telefono;
  }
  get ordenadores_comprados() {
    return this._ordenadores_comprados;
  }
}