import { PiezaFactory } from "./piezaFactory.js";

class Casilla {
    constructor(fila, columna) {
        this._fila = fila;
        this._columna = columna;
        this._pieza = PiezaFactory.crearPiezaAPartirDeCasilla(this);
        this._coordenadas = [fila, columna];
        this._contenedor = null;
    }


    get fila() { return this._fila }
    get columna() { return this._columna }
    get pieza() { return this._pieza }
    get coordenadas() { return this._coordenadas }
    get contenedor() { return this._contenedor }
    set contenedor(contenedor) { this._contenedor = contenedor }

}


export { Casilla };