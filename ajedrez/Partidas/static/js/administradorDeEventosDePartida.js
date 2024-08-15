import { partida, administradorDeInterfazDeTablero, administradorDeElementosHTML } from "./main.js";
import { ValidadorDeJugadas } from "./validadorDeJugadas.js";
import { obtenerRolDePartidaDeUsuario, obtenerColorDeUsuario } from "../../../static/js/funcionesAuxiliares.js";

class AdministradorDeEventosDePartida {

    static seleccionarPieza(pieza) {
        pieza.seleccionada = true;
    }


    static empezarTurnoDeJugador(color) {
        let jugador = partida.obtenerJugadorPorColor(color);
        let colorDeUsuarioActual = obtenerColorDeUsuario();
        console.log("empieza el turno de: ", color);
        console.log("colorDeUsuarioActual: ", colorDeUsuarioActual);

        administradorDeElementosHTML.removerListenersParaRealizarJugada();

        if (colorDeUsuarioActual === color) {
            administradorDeElementosHTML.agregarListenersParaDetectarSeleccionDePieza(jugador);
        }
    }


    static ejecutarJugada(jugada) {
        let esLegal = true; //ValidadorDeJugadas.validarJugada(jugada) -> bool;
        console.log("ejecutarJugada()");

        if (esLegal) {
            administradorDeInterfazDeTablero.quitarImagenDePiezaACasilla(jugada.casillaDePartida);//quito img de la pieza atacante de casilla de partida
            administradorDeInterfazDeTablero.quitarImagenDePiezaACasilla(jugada.casillaAtacada); //quito img de la pieza atacada
            jugada.jugador.moverPieza(jugada);
            administradorDeInterfazDeTablero.asignarImagenDePiezaACasilla(jugada.casillaAtacada);
            partida.siguienteTurno();

            /*quito referencia de jugador y pieza al contenedor (elemento del DOM) de la casillaDePartida
            agregadas por el listener a todas las casillasOcupadas por el jugador*/
            jugada.casillaDePartida.contenedor.pieza = null;
            jugada.casillaDePartida.contenedor.jugador = null;

            let oponente = partida.obtenerOponente(jugada.jugador);
            console.log("-> jugador: ", jugada.jugador.color);
            console.log("-> oponente: ", oponente.color);
            jugada.jugador.turnoActivo = false;
            oponente.turnoActivo = true;

            this.empezarTurnoDeJugador(oponente.color);
        }
    }
}

export { AdministradorDeEventosDePartida };