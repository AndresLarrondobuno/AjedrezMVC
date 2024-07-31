import { Tablero } from "./tablero.js";
import { Partida } from "./partida.js";
import { Jugador } from "./jugador.js";
import { AdministradorDeElementosHTML } from "./administradorDeElementosHTML.js";
import { AdministradorDeInterfazDeTablero } from "./administradorDeInterfazDeTablero.js";

let tablero = new Tablero();

let jugadorSolicitante = new Jugador('solicitante', 'blanco', tablero); //color hardcodeado para testear, el formulario de creacion 

let jugadorDestinatario = new Jugador('destinatario', 'negro', tablero);

let partida = new Partida(jugadorSolicitante, jugadorDestinatario);

let administradorDeInterfazDeTablero = new AdministradorDeInterfazDeTablero(tablero);

AdministradorDeElementosHTML.asignarContenedoresACasillas(tablero);
console.log(tablero.casillas);
administradorDeInterfazDeTablero.asignarColorAContenedoresDeCasillas();

administradorDeInterfazDeTablero.asignarImagenesDePiezasACasillas();

partida.empezarTurnoDeJugador('blanco');

export { partida };