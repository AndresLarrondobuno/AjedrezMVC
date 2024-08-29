import { Tablero } from "./tablero.js";
import { Partida } from "./partida.js";
import { Jugador } from "./jugador.js";
import { AdministradorDeElementosHTML } from "./administradorDeElementosHTML.js";
import { AdministradorDeInterfazDeTablero } from "./administradorDeInterfazDeTablero.js";
import { AdministradorDeEventosDePartida } from "./administradorDeEventosDePartida.js";
import { obtenerRolDePartidaDeUsuario, obtenerColorDeUsuario } from "../../../static/js/funcionesAuxiliares.js";
import { AdministradorDeMensajesWebsocket } from "./conexionwebsocket/administradorDeMensajesWebsocket.js";

let tablero = new Tablero();
let administradorDeInterfazDeTablero = new AdministradorDeInterfazDeTablero(tablero);
let administradorDeElementosHTML = new AdministradorDeElementosHTML();

let rolUsuario = obtenerRolDePartidaDeUsuario();
let colorUsuario = obtenerColorDeUsuario();
let jugadorBlancas;
let jugadorNegras;

if (rolUsuario === 'solicitante') {
    if (colorUsuario === 'blanco') {
        jugadorBlancas = new Jugador('solicitante', 'blanco', tablero);
        jugadorNegras = new Jugador('destinatario', 'negro', tablero);
    }
    else {
        jugadorNegras = new Jugador('solicitante', 'negro', tablero);
        jugadorBlancas = new Jugador('destinatario', 'blanco', tablero);
    }
}
if (rolUsuario === 'destinatario') {
    if (colorUsuario === 'blanco') {
        jugadorBlancas = new Jugador('destinatario', 'blanco', tablero);
        jugadorNegras = new Jugador('solicitante', 'negro', tablero);
    }
    else {
        jugadorBlancas = new Jugador('solicitante', 'blanco', tablero);
        jugadorNegras = new Jugador('destinatario', 'negro', tablero);
    }
}

let partida = new Partida(jugadorBlancas, jugadorNegras);

administradorDeElementosHTML.asignarContenedoresACasillas(tablero);

administradorDeInterfazDeTablero.asignarColorAContenedoresDeCasillas();

administradorDeInterfazDeTablero.asignarImagenesDePiezasACasillas();

AdministradorDeEventosDePartida.iniciarPartida();

export { partida, tablero, administradorDeInterfazDeTablero, administradorDeElementosHTML, jugadorBlancas };