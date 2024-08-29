import { Jugada } from "./jugada.js";
import { partida, tablero } from "./main.js";

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

        this._turnoActivo;
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


    obtenerPiezasEnJuego() {
        let piezasEnJuego = [];
        this.piezas.forEach(pieza => {
            if (pieza.enJuego) {
                piezasEnJuego.push(pieza);
            }

        });
        return piezasEnJuego;
    }


    obtenerPiezaSeleccionada() {
        let piezaSeleccionada;
        this.piezas.forEach(pieza => {
            if (pieza.seleccionada === true) {
                piezaSeleccionada = pieza;
                return;
            }
        });
        return piezaSeleccionada;
    }


    obtenerRey() {
        let rey;
        this.piezas.forEach(pieza => {
            if (pieza.tipo === 'rey') {
                rey = pieza;
                return;
            }
        });
        return rey;
    }


    reyEnJaque() {
        return this.obtenerRey().casilla.bajoAtaque(this)['bajoAtaque'];
    }


    moverPieza(jugada) {
        let casillaDePartida = jugada.casillaDePartida;
        let casillaAtacada = jugada.casillaAtacada;
        let piezaAtacante = jugada.piezaAtacante;
        let piezaAtacada = jugada.piezaAtacada;

        if (piezaAtacada) {
            piezaAtacada.enJuego = false;
            piezaAtacada.casilla = null;
        }

        casillaAtacada.pieza = piezaAtacante;
        casillaDePartida.pieza = null;

        piezaAtacante.casilla = casillaAtacada;
        piezaAtacante.columna = casillaAtacada.columna;
        piezaAtacante.fila = casillaAtacada.fila;
    }


    enrocar(jugada) {
        let casillaDeEnroqueCorto = (jugada.jugador.color === 'blanco') ? tablero.obtenerCasillaAPartirDeCoordenadas(7, 1) : tablero.obtenerCasillaAPartirDeCoordenadas(7, 8);
        let casillaDeEnroqueLargo = (jugada.jugador.color === 'blanco') ? tablero.obtenerCasillaAPartirDeCoordenadas(3, 1) : tablero.obtenerCasillaAPartirDeCoordenadas(3, 8);
        let casillaDeRey;
        let casillaDeTorre;

        if (jugada.casillaAtacada.columna === 1) {
            casillaDeRey = casillaDeEnroqueLargo;
            casillaDeTorre = tablero.obtenerCasillaAPartirDeCoordenadas(casillaDeRey.columna + 1, casillaDeRey.fila);
        }
        else if (jugada.casillaAtacada.columna === 8) {
            casillaDeRey = casillaDeEnroqueCorto;
            casillaDeTorre = tablero.obtenerCasillaAPartirDeCoordenadas(casillaDeRey.columna - 1, casillaDeRey.fila);
        }

        let jugadaParaMoverRey = new Jugada(jugada.jugador, jugada.casillaDePartida, casillaDeRey);
        let jugadaParaMoverTorre = new Jugada(jugada.jugador, jugada.casillaAtacada, casillaDeTorre);
        jugada.jugador.moverPieza(jugadaParaMoverRey);
        jugada.jugador.moverPieza(jugadaParaMoverTorre);

        return { "casillaDeRey": casillaDeRey, "casillaDeTorre": casillaDeTorre };
    }


    capturarAlPaso(jugada) {
        let anteriorJugada = partida.obtenerTurnoAnterior();
        let peonCapturado = anteriorJugada.piezaAtacante;
        jugada.jugador.moverPieza(jugada);
        return peonCapturado;
    }

}

export { Jugador };