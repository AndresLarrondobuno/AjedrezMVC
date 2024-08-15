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


    obtenerCasillaAPartirDeCoordenadas(columna, fila) {
        let casillaEncontrada = null;
        this.casillas.forEach(casilla => {
            if (casilla.columna === columna && casilla.fila === fila) {
                casillaEncontrada = casilla;
            }
        });
        return casillaEncontrada;
    }


    //crea las 64 casillas del tablero de izq a dcha y de abajo hacia arriba
    crearCasillas() {
        let casillas = [];
        rango(1, 8).forEach(fila => {
            rango(1, 8).forEach(columna => {
                var casilla = new Casilla(columna, fila);
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