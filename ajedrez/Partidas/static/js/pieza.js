import { primeraLetraMayuscula } from "../../../static/js/funcionesAuxiliares.js";
import { tablero, partida } from "./main.js";
import { Jugada } from "./jugada.js";
import { ValidadorDeJugadas } from "./validadorDeJugadas.js";

class Pieza {
    constructor(tipo, color, casillaInicial) {
        this._tipo = tipo;
        this._color = color;
        this._casilla = casillaInicial;
        this._casillaInicial = casillaInicial;
        this._fila = casillaInicial.fila;
        this._columna = casillaInicial.columna;

        this._idContenedorImagen = null;
        this._enJuego = true;
        this._seleccionada = false;
    }

    get tipo() { return this._tipo }
    get casilla() { return this._casilla }
    get color() { return this._color }
    get fila() { return this._fila }
    get columna() { return this._columna }
    get idContenedorImagen() { return this._idContenedorImagen }
    get seleccionada() { return this._seleccionada }
    get enJuego() { return this._enJuego }
    get casillaInicial() { return this._casillaInicial }

    set enJuego(bool) { return this._enJuego = bool }
    set seleccionada(bool) { return this._seleccionada = bool }
    set casilla(casilla) { return this._casilla = casilla }
    set fila(numeroDeFila) { return this._fila = numeroDeFila }
    set columna(numeroDeColumna) { return this._columna = numeroDeColumna }


    respetaPatronDeMovimiento(jugada) { }
    respetaPatronDeAtaque(jugada) { return this.respetaPatronDeMovimiento(jugada) }

    casillasAtacadas() {
        let jugador = partida.obtenerJugadorPorColor(this.color);
        let casillasAtacadas = [];

        tablero.casillas.forEach(casilla => {
            if (casilla !== this.casilla) {
                let jugada = new Jugada(jugador, this.casilla, casilla);
                if (this.respetaPatronDeAtaque(jugada)) {
                    casillasAtacadas.push(casilla);
                }
            }
        });
        return casillasAtacadas;
    }


    casillasDisponiblesParaMovimiento() {
        let jugador = partida.obtenerJugadorPorColor(this.color);
        let casillasAtacadas = [];

        tablero.casillas.forEach(casilla => {
            if (casilla !== this.casilla) {
                let jugada = new Jugada(jugador, this.casilla, casilla);
                let respetaPatronDeMovimiento = this.respetaPatronDeMovimiento(jugada);
                let atacaPiezaAliada = casilla.pieza ? (casilla.pieza.color === this.color) : false;
                if (respetaPatronDeMovimiento && !atacaPiezaAliada) {
                    casillasAtacadas.push(casilla);
                }
            }
        });
        return casillasAtacadas;
    }

}


class Rey extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenRey${primeraLetraMayuscula(color)}`;
    }

    respetaPatronDeMovimiento(jugada) {
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;
        let jugadaEnColumna = casillaDePartida.comparteColumnaCon(casillaAtacada);
        let jugadaEnFila = casillaDePartida.comparteFilaCon(casillaAtacada);
        let jugadaEnDiagonal = casillaDePartida.comparteDiagonalCon(casillaAtacada);
        let distanciaOrtogonal = casillaDePartida.distanciaOrtogonal(casillaAtacada);


        if (((jugadaEnColumna || jugadaEnFila) && (distanciaOrtogonal <= 1)) || (jugadaEnDiagonal && (distanciaOrtogonal <= 2))) {
            return true;
        }
        else { return false; }
    }
}


class Reina extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenReina${primeraLetraMayuscula(color)}`;
    }


    respetaPatronDeMovimiento(jugada) {
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;
        let jugadaEnColumna = casillaDePartida.comparteColumnaCon(casillaAtacada);
        let jugadaEnFila = casillaDePartida.comparteFilaCon(casillaAtacada);
        let jugadaEnDiagonal = casillaDePartida.comparteDiagonalCon(casillaAtacada);

        if (jugada.poseePiezaEnRutaDeMovimiento()) {
            return false;
        }

        if (jugadaEnColumna || jugadaEnFila || jugadaEnDiagonal) {
            return true;
        }
        else { return false; }
    }


}


class Torre extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenTorre${primeraLetraMayuscula(color)}`;
    }


    respetaPatronDeMovimiento(jugada) {
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;

        if (jugada.poseePiezaEnRutaDeMovimiento()) {
            return false;
        }

        if (casillaDePartida.comparteFilaCon(casillaAtacada) || casillaDePartida.comparteColumnaCon(casillaAtacada)) {
            return true;
        }
        else { return false; }
    }

}


class Caballo extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenCaballo${primeraLetraMayuscula(color)}`;
    }


    respetaPatronDeMovimiento(jugada) {
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;
        let jugadaEnColumna = casillaDePartida.comparteColumnaCon(casillaAtacada);
        let jugadaEnFila = casillaDePartida.comparteFilaCon(casillaAtacada);
        let jugadaEnDiagonal = casillaDePartida.comparteDiagonalCon(casillaAtacada);
        let noExcedeDistanciaOrtogonal = casillaDePartida.distanciaOrtogonal(casillaAtacada) === 3;


        if (!jugadaEnColumna && !jugadaEnFila && !jugadaEnDiagonal && noExcedeDistanciaOrtogonal) {
            return true;
        }
        else { return false; }
    }

}


class Alfil extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenAlfil${primeraLetraMayuscula(color)}`;
    }


    respetaPatronDeMovimiento(jugada) {
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;

        if (jugada.poseePiezaEnRutaDeMovimiento()) {
            return false;
        }

        if (casillaDePartida.comparteDiagonalCon(casillaAtacada)) {
            return true;
        }
        else return false;

    }


}


class Peon extends Pieza {
    constructor(tipo, color, casilla) {
        super(tipo, color, casilla);
        this._idContenedorImagen = `imagenPeon${primeraLetraMayuscula(color)}`;
    }

    respetaPatronDeAtaque(jugada) {
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;
        if (!this.avanzaHaciaPromocion(jugada)) return false;
        if (casillaDePartida.comparteDiagonalCon(casillaAtacada) && casillaDePartida.distanciaOrtogonal(casillaAtacada) <= 2) {
            return true;
        }
    }


    respetaPatronDeMovimiento(jugada) {
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;
        let avanzaHaciaPromocion = this.avanzaHaciaPromocion(jugada);
        let parteDeCasillaInicial = !partida.piezaFueMovida(this);
        let atacaPieza = casillaAtacada.pieza;

        if (jugada.poseePiezaEnRutaDeMovimiento()) {
            return false;
        }

        if (!avanzaHaciaPromocion) {
            return false;
        }

        if (atacaPieza || ValidadorDeJugadas.esJugadaDeCapturaAlPaso(jugada)) {
            if (casillaDePartida.comparteDiagonalCon(casillaAtacada) && casillaDePartida.distanciaOrtogonal(casillaAtacada) <= 2) {
                return true;
            }
            else { return false; }
        }
        else {
            if (casillaDePartida.comparteColumnaCon(casillaAtacada)) {
                if (casillaDePartida.distanciaVertical(casillaAtacada) === 1) {
                    return true;
                }
                if (parteDeCasillaInicial && casillaDePartida.distanciaVertical(casillaAtacada) <= 2) {
                    return true;
                }
                else { return false; }
            }
            else { return false; }
        }
    }


    avanzaHaciaPromocion(jugada) {
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;
        let distanciaPreviaAlMovimiento;
        let distanciaPosteriorAlMovimiento;

        if (this.color === 'blanco') {
            distanciaPreviaAlMovimiento = casillaDePartida.distanciaVertical(tablero.filaDePromocionDeBlancas[0]);
            distanciaPosteriorAlMovimiento = casillaAtacada.distanciaVertical(tablero.filaDePromocionDeBlancas[0]);
        }
        else if (this.color === 'negro') {
            distanciaPreviaAlMovimiento = casillaDePartida.distanciaVertical(tablero.filaDePromocionDeNegras[0]);
            distanciaPosteriorAlMovimiento = casillaAtacada.distanciaVertical(tablero.filaDePromocionDeNegras[0]);
        }
        return distanciaPreviaAlMovimiento > distanciaPosteriorAlMovimiento;
    }

}



export { Pieza, Rey, Reina, Torre, Caballo, Alfil, Peon };