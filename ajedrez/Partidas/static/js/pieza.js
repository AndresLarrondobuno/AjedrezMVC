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
    }

    get casilla() { return this._casilla }
    get color() { return this._color }
    get fila() { return this._fila }
    get columna() { return this._columna }
    get idContenedorImagen() { return this._idContenedorImagen }
    get seleccionada() { return this._seleccionada }

}


class Rey extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenRey${primeraLetraMayuscula(color)}`;
    }

}


class Reina extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenReina${primeraLetraMayuscula(color)}`;
    }

}


class Torre extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenTorre${primeraLetraMayuscula(color)}`;
    }

}


class Caballo extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenCaballo${primeraLetraMayuscula(color)}`;
    }

}


class Alfil extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenAlfil${primeraLetraMayuscula(color)}`;
    }

}


class Peon extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenPeon${primeraLetraMayuscula(color)}`;
    }

}



export { Pieza, Rey, Reina, Torre, Caballo, Alfil, Peon };