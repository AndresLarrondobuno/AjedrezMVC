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
        this._filaDePromocionDeBlancas = this.obtenerFila(8);
        this._filaDePromocionDeNegras = this.obtenerFila(1);
    }


    get casillas() { return this._casillas }
    get piezas() { return this._piezas }
    get piezasBlancas() { return this._piezasBlancas }
    get piezasNegras() { return this._piezasNegras }
    get filaDePromocionDeBlancas() { return this._filaDePromocionDeBlancas }
    get filaDePromocionDeNegras() { return this._filaDePromocionDeNegras }


    obtenerCasillaAPartirDeCoordenadas(columna, fila) {
        let casillaEncontrada = null;
        this.casillas.forEach(casilla => {
            if (casilla.columna === columna && casilla.fila === fila) {
                casillaEncontrada = casilla;
            }
        });
        return casillaEncontrada;
    }


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


    obtenerFila(numeroDeFila) {
        let fila = [];
        this.casillas.forEach(casilla => {
            if (casilla.fila === numeroDeFila) {
                fila.push(casilla);
            }
        });
        return fila;
    }


    obtenerColumna(numeroDeColumna) {
        let columna = [];
        this.casillas.forEach(casilla => {
            if (casilla.columna === numeroDeColumna) {
                columna.push(casilla);
            }
        });
        return columna;
    }


    obtenerDiagonales(numeroDeColumna, numeroDeFila) {
        let casillaDeComparacion = obtenerCasillaAPartirDeCoordenadas(numeroDeColumna, numeroDeFila);
        let diagonal = [];
        this.casillas.forEach(casilla => {
            if (casilla.comparteDiagonalCon(casillaDeComparacion)) {
                diagonal.push(casilla);
            }
        });
        return diagonal;
    }


    obtenerDiagonal(casilla1, casilla2) {
        let diagonal = [];
        this.casillas.forEach(casilla => {
            if (casilla.comparteDiagonalCon(casilla1) && (casilla.comparteDiagonalCon(casilla2))) {
                diagonal.push(casilla);
            }
        });
        return diagonal;
    }


    deshacerJugada(jugada) {
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;
        let piezaAtacante = jugada.piezaAtacante;
        let piezaAtacada = jugada.piezaAtacada;

        if (piezaAtacada) {
            piezaAtacada.enJuego = true;
            piezaAtacada.casilla = casillaAtacada;
        }

        casillaAtacada.pieza = piezaAtacada;
        casillaDePartida.pieza = piezaAtacante;

        piezaAtacante.casilla = casillaDePartida;
        piezaAtacante.columna = casillaDePartida.columna;
        piezaAtacante.fila = casillaDePartida.fila;
    }

}

export { Tablero };