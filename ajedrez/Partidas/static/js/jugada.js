import { tablero } from "./main.js";
import { ValidadorDeJugadas } from "./validadorDeJugadas.js";

class Jugada {
    constructor(jugador, casillaDePartida, casillaAtacada) {
        this._casillaDePartida = casillaDePartida;
        this._casillaAtacada = casillaAtacada;
        this._piezaAtacante = casillaDePartida.pieza;
        this._piezaAtacada = casillaAtacada.pieza ? casillaAtacada.pieza : null;
        this._eje = this.obtenerEjeDeMovimiento();
        this._direccion = this._eje ? this.obtenerDireccionDeMovimiento() : null;
        this._ruta = this._eje ? this.obtenerRutaDeMovimiento() : [];
        this._jugador = jugador;
    }

    get casillaDePartida() { return this._casillaDePartida }
    get casillaAtacada() { return this._casillaAtacada }
    get eje() { return this._eje }
    get direccion() { return this._direccion }
    get ruta() { return this._ruta }
    get jugador() { return this._jugador }
    get piezaAtacante() { return this._piezaAtacante }
    get piezaAtacada() { return this._piezaAtacada }


    obtenerEjeDeMovimiento() {
        if (this.casillaDePartida.comparteFilaCon(this.casillaAtacada)) { return 'horizontal' }

        if (this.casillaDePartida.comparteColumnaCon(this.casillaAtacada)) { return 'vertical' }

        if (this.casillaDePartida.comparteDiagonalCon(this.casillaAtacada)) { return 'diagonal' }
    }


    obtenerDireccionDeMovimiento() {
        let eje = this.obtenerEjeDeMovimiento();
        if (eje === 'horizontal') {
            if (this.casillaDePartida.columna < this.casillaAtacada.columna) {
                var direccionHorizontal = true;
            }
            else {
                var direccionHorizontal = false;
            }
            return { "direccionHorizontal": direccionHorizontal, "direccionVertical": null }
        }
        if (eje === 'vertical') {
            if (this.casillaDePartida.fila < this.casillaAtacada.fila) {
                var direccionVertical = true;
            }
            else {
                var direccionVertical = false;
            }
            return { "direccionHorizontal": null, "direccionVertical": direccionVertical }
        }
        if (eje === 'diagonal') {
            if (this.casillaDePartida.columna < this.casillaAtacada.columna) {
                var direccionHorizontal = true;
            }
            else {
                var direccionHorizontal = false;
            }
            if (this.casillaDePartida.fila < this.casillaAtacada.fila) {
                var direccionVertical = true;
            }
            else {
                var direccionVertical = false;
            }
            return { "direccionHorizontal": direccionHorizontal, "direccionVertical": direccionVertical }
        }
    }


    obtenerRutaDeMovimiento() {
        let casillas = []
        switch (this.eje) {
            case ('horizontal'):
                casillas = tablero.obtenerFila(this.casillaDePartida.fila);
                break;
            case ('vertical'):
                casillas = tablero.obtenerColumna(this.casillaDePartida.columna);
                break;
            case ('diagonal'):
                casillas = tablero.obtenerDiagonal(this.casillaDePartida, this.casillaAtacada);
                break;
            default:
                casillas = [];
        }

        let casillasOrdenadas = this.ordenarCasillas(casillas, this);

        let indiceDeCasillaDePartida = casillasOrdenadas.indexOf(this.casillaDePartida);
        let indiceDeCasillaAtacada = casillasOrdenadas.indexOf(this.casillaAtacada);

        let ruta;
        ruta = casillasOrdenadas.slice(indiceDeCasillaDePartida + 1, indiceDeCasillaAtacada);
  
        return ruta;
    }


    ordenarCasillas(arrayCasillas) {
        const { direccionHorizontal, direccionVertical } = this.direccion;

            let esDiagonalPrincipal;
            let esDiagonalAscendente;

            if (direccionHorizontal === direccionVertical) { esDiagonalPrincipal = true }
            else { esDiagonalPrincipal = false }

            if (direccionHorizontal === true) { esDiagonalAscendente = true }
            else { esDiagonalAscendente = false }



        return [...arrayCasillas].sort((a, b) => {
            if (direccionHorizontal !== null && direccionVertical === null) {
                return direccionHorizontal ? a.columna - b.columna : b.columna - a.columna;
            } else if (direccionHorizontal === null && direccionVertical !== null) {
                return direccionVertical ? a.fila - b.fila : b.fila - a.fila;
            } else {

            if (esDiagonalPrincipal && esDiagonalAscendente) {
                return a.fila - b.fila; // Diagonal principal ascendente
            } else if (esDiagonalPrincipal && !esDiagonalAscendente) {
                return b.fila - a.fila; // Diagonal principal descendente
            } else if (!esDiagonalPrincipal && esDiagonalAscendente) {
                return b.fila - a.fila; // Diagonal secundaria ascendente
            } else {
                return a.fila - b.fila; // Diagonal secundaria descendente
            }
        }
    });
    }


    poseePiezaEnRutaDeMovimiento() {
        let piezaInterrumpeMovimiento = false;
        this.ruta.forEach(casilla => {
            if (casilla.pieza) {
                piezaInterrumpeMovimiento = true;
            }
        });
        return piezaInterrumpeMovimiento;
    }

}

export { Jugada };