import { Casilla } from "./casilla.js";
import { rango } from "../../../static/js/funcionesAuxiliares.js";

class Tablero {
    constructor() {
        this._casillas = this.crearCasillas();
        this._piezas = [];
        this._piezasBlancas = [];
        this._piezasNegras = [];
        this.agregarPiezas();
        this.agregarPiezasBlancas();
        this.agregarPiezasNegras();
    }


    get casillas() { return this._casillas }
    get piezas() { return this._piezas }
    get piezasBlancas() { return this._piezasBlancas }
    get piezasNegras() { return this._piezasNegras }

    //crea las 64 casillas del tablero
    crearCasillas() {
        let casillas = [];
        rango(1, 8).forEach(fila => {
            rango(1, 8).forEach(columna => {
                var casilla = new Casilla(fila, columna);
                casillas.push(casilla);
            });
        });
        return casillas;
    }


    agregarPiezas() {
        this.casillas.forEach(casilla => {
            if (casilla.pieza) {
                this.piezas.push(casilla.pieza);
            }
        });
    }


    agregarPiezasBlancas() {
        this.piezas.forEach(pieza => {
            if (pieza.color === 'blanco') {
                this._piezasBlancas.push(pieza);
            }
        });
    }


    agregarPiezasNegras() {
        this.piezas.forEach(pieza => {
            if (pieza.color === 'negro') {
                this._piezasNegras.push(pieza);
            }
        });
    }

}

export { Tablero };