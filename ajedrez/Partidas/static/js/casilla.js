import { PiezaFactory } from "./piezaFactory.js";

class Casilla {
    constructor(columna, fila) {
        this._columna = columna;
        this._fila = fila;
        this._pieza = PiezaFactory.crearPiezaAPartirDeCasilla(this);
        this._coordenadas = {"columna": columna, "fila": fila};
        this._contenedor = null;

        this._x = columna;
        this._y = fila;
    }


    get fila() { return this._fila }
    get columna() { return this._columna }
    get pieza() { return this._pieza }
    get coordenadas() { return this._coordenadas }
    get contenedor() { return this._contenedor }
    set contenedor(contenedor) { this._contenedor = contenedor }
    set pieza(pieza) { this._pieza = pieza }

    get x() { return this._x }
    get y() { return this._y }


    distanciaHorizontal(casilla) {
        return Math.abs(this.columna - casilla.columna)
    }


    distanciaVertical(casilla) {
        return Math.abs(this.fila - casilla.fila)
    }


    distanciaOrtogonal(casilla) {
        return this.distanciaHorizontal(casilla) + this.distanciaVertical(casilla)
    }


    comparteFilaCon(casilla) {
        if (this.fila === casilla.fila) {
            return true
        }
        else {
            return false
        }
    }


    comparteColumnaCon(casilla) {
        if (this.columna === casilla.columna) {
            return true
        }
        else {
            return false
        }
    }


    comparteDiagonalCon(casilla) {
        if (Math.abs(this.columna - casilla.columna) === Math.abs(this.fila - casilla.fila)) {
            return true
        }
        else {
            return false
        }
    }


    comparteDiagonalPrincipalCon(casilla) {
        if ((this.columna - casilla.columna) === (this.fila - casilla.fila)) {
            return true
        }
        else {
            return false
        }
    }


    comparteDiagonalSecundariaCon(casilla) {
        if (Math.abs(this.columna - casilla.columna) === Math.abs(this.fila - casilla.fila)) {
            return true
        }
        else {
            return false
        }
    }


    ortogonalCon(casilla) {
        if (this.comparteFilaCon(casilla) || this.comparteColumnaCon(casilla)) {
            return true
        }
        else{
            return false
        }
    }

}


export { Casilla };