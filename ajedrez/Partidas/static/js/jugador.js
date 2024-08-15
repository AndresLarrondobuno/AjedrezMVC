import { obtenerColorDeUsuario } from "../../../static/js/funcionesAuxiliares.js";

class Jugador {
    constructor(rol, color, tablero) {
        this._rol = rol;
        this._color = color;
        if (this.color === 'blanco') {
            this._piezas = tablero.piezasBlancas;
        }
        else {
            this._piezas = tablero.piezasNegras;
        }

        this._turnoActivo = null;
    }

    get rol() { return this._rol }
    get color() { return this._color }
    get piezas() { return this._piezas }
    get turnoActivo() { return this._turnoActivo }
    set turnoActivo(bool) { this._turnoActivo = bool }


    obtenerCasillasOcupadas() {
        let casillasOcupadas = [];
        this.piezas.forEach(pieza => {
            if (pieza.enJuego) {
                casillasOcupadas.push(pieza.casilla);
            }

        });
        return casillasOcupadas;
    }


    moverPieza(jugada) {
        console.log("moverPieza -> obj jugada: ", jugada);
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;
        let piezaAtacante = casillaDePartida.pieza;
        let piezaAtacada = casillaAtacada.pieza ? casillaAtacada.pieza : null;

        if (piezaAtacada) {
            piezaAtacada.enJuego = false;
            piezaAtacada.casilla = null;
        }

        casillaAtacada.pieza = piezaAtacante;
        casillaDePartida.pieza = null;
        piezaAtacante.casilla = casillaAtacada;

    }

}

export { Jugador };