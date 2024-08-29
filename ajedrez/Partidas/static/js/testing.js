import { jugadorBlancas, tablero } from "./main.js";
import { Jugada } from "./jugada.js";

let casilla = tablero.casillas[4];
let pieza = casilla.pieza;

console.log("casillasAtacadas: ", pieza.casillasAtacadas()); //test
console.log("rey bajo ataque: ", casilla.bajoAtaque(jugadorBlancas)); //test
console.log("pieza: ", pieza); //test
