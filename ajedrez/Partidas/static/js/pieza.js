import { primeraLetraMayuscula } from "../../../static/js/funcionesAuxiliares.js";

class Pieza {
    constructor(tipo, color, casilla) {
        this._tipo = tipo;
        this._color = color;
        this._casilla = casilla;
        this._fila = casilla.fila;
        this._columna = casilla.columna;
        
        this._idContenedorImagen = null;
        this._seleccionada = false;
        this._enJuego = true;
    }

    get casilla() { return this._casilla }
    get color() { return this._color }
    get fila() { return this._fila }
    get columna() { return this._columna }
    get idContenedorImagen() { return this._idContenedorImagen }
    get seleccionada() { return this._seleccionada }
    get enJuego() { return this._enJuego }
    set enJuego(bool) { return this._enJuego = bool }
    set casilla(casilla) { return this._casilla = casilla }

    respetaPatronDeMovimiento(jugada) {}
}


class Rey extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenRey${primeraLetraMayuscula(color)}`;
    }

    respetaPatronDeMovimiento(jugada) {

    }

}


class Reina extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenReina${primeraLetraMayuscula(color)}`;
    }


    respetaPatronDeMovimiento(jugada) {

    }


}


class Torre extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenTorre${primeraLetraMayuscula(color)}`;
    }


    respetaPatronDeMovimiento(jugada) {

    }


}


class Caballo extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenCaballo${primeraLetraMayuscula(color)}`;
    }


    respetaPatronDeMovimiento(jugada) {

    }


}


class Alfil extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenAlfil${primeraLetraMayuscula(color)}`;
    }


    respetaPatronDeMovimiento(jugada) {

    }


}


class Peon extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenPeon${primeraLetraMayuscula(color)}`;
    }


    respetaPatronDeMovimiento(jugada) {

    }


    respetaPatronDeAtaque(jugada) {

    }


}



export { Pieza, Rey, Reina, Torre, Caballo, Alfil, Peon };