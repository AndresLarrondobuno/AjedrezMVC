import { tablero, partida } from "./main.js";

class Jugada {
    constructor(jugador, casillaDePartida, casillaAtacada) {
        this._casillaDePartida = casillaDePartida;
        this._casillaAtacada = casillaAtacada;
        this._piezaAtacante = casillaDePartida.pieza;
        this._eje = this.obtenerEjeDeMovimiento();
        this._direccion = this.obtenerDireccionDeMovimiento();
        this._ruta = this.obtenerRutaDeMovimiento();
        this._jugador = jugador;
        console.log("ruta: ", this.ruta);
    }

    get casillaDePartida() { return this._casillaDePartida }
    get casillaAtacada() { return this._casillaAtacada }
    get piezaAtacante() { return this._piezaAtacante }
    get eje() { return this._eje }
    get direccion() { return this._direccion }
    get ruta() { return this._ruta }
    get jugador() { return this._jugador }


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
        if (this.eje === 'horizontal') {
            var casillas = this.obtenerFila();
        }
        if (this.eje === 'vertical') {
            var casillas = this.obtenerColumna();
        }
        if (this.eje === 'diagonal') {
            var casillas = this.obtenerDiagonal();
        }
        console.log("casillas para ordenamiento: ", casillas);

        let casillasOrdenadas = this.ordenarCasillas(casillas, this);

        let indiceDeCasillaDePartida = casillasOrdenadas.indexOf(this.casillaDePartida);
        let indiceDeCasillaAtacada = casillasOrdenadas.indexOf(this.casillaAtacada);

        let ruta = casillasOrdenadas.slice(indiceDeCasillaDePartida + 1, indiceDeCasillaAtacada);
        return ruta;
    }

    ordenarCasillas(arrayCasillas, jugada) {
        let copiaArrayCasillas = [...arrayCasillas];
        let direccionHorizontal = jugada.direccion['direccionHorizontal'];
        let direccionVertical = jugada.direccion['direccionVertical'];

        if (direccionHorizontal === true && direccionVertical === null) {
            var arrayOrdenado = copiaArrayCasillas.sort((a, b) => {
                return a.columna - b.columna; // derecha
            });
        }
        if (direccionHorizontal === false && direccionVertical === null) {
            var arrayOrdenado = copiaArrayCasillas.sort((a, b) => {
                return b.columna - a.columna; // izquierda
            });
        }
        if (direccionHorizontal === null && direccionVertical === true) {
            var arrayOrdenado = copiaArrayCasillas.sort((a, b) => {
                return a.fila - b.fila; // arriba
            });
        }
        if (direccionHorizontal === null && direccionVertical === false) {
            var arrayOrdenado = copiaArrayCasillas.sort((a, b) => {
                return b.fila - a.fila; // abajo
            });
        }
        if (direccionHorizontal !== null && direccionVertical !== null) {
            const signo = direccionHorizontal ? 1 : -1;

            var arrayOrdenado = copiaArrayCasillas.sort((a, b) => {
                const pendienteA = a.fila / a.columna;
                const pendienteB = b.fila / b.columna;

                return signo * (pendienteA - pendienteB);
            });
        }
        return arrayOrdenado;
    }


    obtenerFila() {
        let fila = [];
        tablero.casillas.forEach(casilla => {
            if (casilla.comparteFilaCon(this.casillaDePartida)) {
                fila.push(casilla);
            }
        });
        return fila;
    }


    obtenerColumna() {
        let columna = [];
        tablero.casillas.forEach(casilla => {
            if (casilla.comparteColumnaCon(this.casillaDePartida)) {
                columna.push(casilla);
            }
        });
        return columna;
    }


    obtenerDiagonal() {
        let diagonal = [];
        tablero.casillas.forEach(casilla => {
            if (casilla.comparteDiagonalCon(this.casillaDePartida) && (casilla.comparteDiagonalCon(this.casillaAtacada))) {
                diagonal.push(casilla);
            }
        });
        return diagonal;
    }

}

export { Jugada };