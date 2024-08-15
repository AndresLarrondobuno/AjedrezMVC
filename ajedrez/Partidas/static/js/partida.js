import { obtenerIdDePartida, obtenerRolDePartidaDeUsuario } from "../../../static/js/funcionesAuxiliares.js";
import { administradorDeElementosHTML } from "./main.js";

class Partida {
    constructor(jugadorSolicitante, jugadorDestinatario) {
        this._jugadores = {
            "jugadorSolicitante": jugadorSolicitante,
            "jugadorDestinatario": jugadorDestinatario,
        }
        this._turnoActual = 1;
        this._id = obtenerIdDePartida();
        this._rolUsuarioAsociadoACliente = obtenerRolDePartidaDeUsuario();
    }


    get id() { return this._id }
    get turnoActual() { return this._turnoActual }
    get jugadores() { return this._jugadores }
    get rolUsuarioAsociadoACliente() { return this._rolUsuarioAsociadoACliente }


    obtenerJugadorPorRol(rol) {
        if (rol === 'solicitante') {
            return this._jugadores["jugadorSolicitante"]
        }
        if (rol === 'destinatario') {
            return this._jugadores["jugadorDestinatario"]
        }
        else {
            console.log(`rol invalido: ${rol}`);
        }
    }


    obtenerOponente(jugador) {
        if (jugador.color === 'blanco') {
            return this.obtenerJugadorPorColor('negro');
        }
        else if (jugador.color === 'negro') {
            return this.obtenerJugadorPorColor('blanco');
        }
        else {
            console.log("jugador invalido.");
        }
    }


    obtenerJugadorEnTurnoActivo() {
        if (this.jugadores['jugadorSolicitante'].turnoActivo) {
            return this.jugadores['jugadorSolicitante']
        }
        else {
            return this.jugadores['jugadorDestinatario']
        }
    }


    obtenerJugadorPorColor(color) {
        if (this.jugadores['jugadorSolicitante'].color === color)  {
            return this.jugadores['jugadorSolicitante']
        }
        else {
            return this.jugadores['jugadorDestinatario']
        }
    }


    siguienteTurno() {
        this._turnoActual++;
    }


}

export { Partida }