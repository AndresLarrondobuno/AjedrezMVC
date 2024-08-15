import { Tablero } from "./tablero.js";
import { Partida } from "./partida.js";
import { Jugador } from "./jugador.js";
import { AdministradorDeElementosHTML } from "./administradorDeElementosHTML.js";
import { AdministradorDeInterfazDeTablero } from "./administradorDeInterfazDeTablero.js";
import { AdministradorDeEventosDePartida } from "./administradorDeEventosDePartida.js";

//testing
import { Jugada } from "./jugada.js";
import { obtenerRolDePartidaDeUsuario, obtenerRolDePartidaDeUsuarioOponente, randomizarArray, obtenerBooleanoAleatorio, obtenerColorDeUsuario } from "../../../static/js/funcionesAuxiliares.js";

console.log(obtenerRolDePartidaDeUsuario());
let tablero = new Tablero();

let rolUsuario = obtenerRolDePartidaDeUsuario();
let rolOponente = obtenerRolDePartidaDeUsuarioOponente();
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
console.log("j blancas / j negras: ", jugadorBlancas, jugadorNegras);
let partida = new Partida(jugadorBlancas, jugadorNegras);

let administradorDeInterfazDeTablero = new AdministradorDeInterfazDeTablero(tablero);
let administradorDeElementosHTML = new AdministradorDeElementosHTML();

administradorDeElementosHTML.asignarContenedoresACasillas(tablero);

administradorDeInterfazDeTablero.asignarColorAContenedoresDeCasillas();

administradorDeInterfazDeTablero.asignarImagenesDePiezasACasillas();

AdministradorDeEventosDePartida.empezarTurnoDeJugador('blanco');


let casilla81 = tablero.casillas[7];
let casilla12 = tablero.casillas[8];
let casilla18 = tablero.casillas[56];
let casilla85 = tablero.casillas[39];
let casilla74 = tablero.casillas[30];
let casillaRey = tablero.casillas[60];
let casilla17 = tablero.casillas[48];
let casilla13 = tablero.casillas[16];


/*
let jugadaTest = new Jugada(jugadorSolicitante, casilla13, casilla12);
let casillasTest = jugadaTest.obtenerColumna();


let casillasTestRandom = randomizarArray(casillasTest);
let casillasOrdenadasTest = ordenarCasillas(casillasTestRandom, jugadaTest);

console.log("casillasRandom: ", casillasTestRandom);
console.log("casillasOrdenadas: ", casillasOrdenadasTest);
console.log("direccion de movimiento: ", jugadaTest.direccion);


administradorDeInterfazDeTablero.resaltarCasillas(casillasTest);
*/

export { partida, tablero, administradorDeInterfazDeTablero, administradorDeElementosHTML };