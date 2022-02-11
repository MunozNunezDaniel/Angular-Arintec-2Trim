export class Ordenador {
  public _modelo: String;
  public _fecha_montaje: Date;
  public _fecha_garantia: Date;
  public _precio_del_pc: Number;
  public _cantidad: Number;
  public _RAM: Number;
  public _disco_duro: String;
  public _comprador: String;

  public constructor(
    modelo: String,
    fecha_montaje: Date,
    fecha_garantia: Date,
    precio_del_pc: Number,
    cantidad: Number,
    RAM: Number,
    disco_duro: String,
    comprador: String
  ) {
    this._modelo = modelo;
    this._fecha_montaje = fecha_montaje;
    this._fecha_garantia = fecha_garantia;
    this._precio_del_pc = precio_del_pc;
    this._cantidad = cantidad;
    this._RAM = RAM;
    this._disco_duro = disco_duro;
    this._comprador = comprador;
  }
  get modelo() {
    return this._modelo;
  }
  get fecha_montaje() {
    return this._fecha_montaje;
  }
  get fecha_garantia() {
    return this._fecha_garantia;
  }
  get precio_del_pc() {
    return this._precio_del_pc;
  }
  get cantidad() {
    return this._cantidad;
  }
  get RAM() {
    return this._RAM;
  }
  get disco_duro() {
    return this._disco_duro;
  }
  get comprador() {
    return this._comprador;
  }
  
  //Hacer metodo iva
  iva() {

  }
  /*
  
  iva2() {
    if (this._tipo == 'alimentacion') {
      let precioiva: number = this._precio_del_pc * 0.21 + this._precio_del_pc;
      return precioiva;
    } else {
      let precioiva1: number = this._precio_del_pc * 0.04 + this._precio_del_pc;
      return precioiva1;
    }
  }
*/
  dias() {
    let date: Date = new Date();
    let miliseconds: number =
      new Date(this._fecha_garantia).getTime() - new Date(this._fecha_montaje).getTime();
    let dia = miliseconds / 86400000;
    let calc = Math.floor(dia);
    return calc;
  }

  tipos() {}

}
