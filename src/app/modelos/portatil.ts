import { Ordenador } from './ordenador';

export class Portatil extends Ordenador {
    public _duracion_bateria: String
  
    public constructor(
      _modelo: String,
      _fecha_montaje: Date,
      _fecha_garantia: Date,
      _precio_del_pc: Number,
      _cantidad: Number,
      _RAM: Number,
      _disco_duro: String,
      _comprador: String,
      duracion_bateria: String
    ) 
    {
        super(_modelo, _fecha_montaje, _fecha_garantia, _precio_del_pc, _cantidad, _RAM, _disco_duro, _comprador);
        this._duracion_bateria = duracion_bateria;
    }
    get duracion_bateria() {
      return this._duracion_bateria;
    }
}