import { Ordenador } from './ordenador';

export class Sobremesa extends Ordenador {
    public _refrig_liquida: String
  
    public constructor(
      _modelo: String,
      _fecha_montaje: Date,
      _fecha_garantia: Date,
      _precio_del_pc: number,
      _cantidad: number,
      _RAM: number,
      _disco_duro: String,
      _comprador: String,
      refrig_liquida: String
    ) 
    {
        super(_modelo, _fecha_montaje, _fecha_garantia, _precio_del_pc, _cantidad, _RAM, _disco_duro, _comprador);
        this._refrig_liquida = refrig_liquida;
    }
    get refrig_liquida() {
      return this._refrig_liquida;
    }
}