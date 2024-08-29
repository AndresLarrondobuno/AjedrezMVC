import { partida, administradorDeInterfazDeTablero, administradorDeElementosHTML, tablero, jugadorBlancas } from "./main.js";
import { obtenerColorDeUsuario } from "../../../static/js/funcionesAuxiliares.js";
import { ValidadorDeJugadas } from "./validadorDeJugadas.js";
import { AdministradorDeMensajesWebsocket } from "./conexionwebsocket/administradorDeMensajesWebsocket.js";

class AdministradorDeEventosDePartida {

    static iniciarPartida() {
        let jugador = jugadorBlancas;
        let colorDeUsuarioActual = obtenerColorDeUsuario();

        if (colorDeUsuarioActual === 'blanco') {
            administradorDeElementosHTML.agregarListenersParaDetectarSeleccionDePieza(jugador);
            administradorDeInterfazDeTablero.resaltarCasillas(jugador.obtenerCasillasOcupadas());
        }
    }


    static empezarTurnoDeJugador(color) {
        console.log("empezarTurnoDeJugador()");
        let jugador = partida.obtenerJugadorPorColor(color);
        let oponente = partida.obtenerOponente(jugador);
        let colorDeUsuarioActual = obtenerColorDeUsuario();

        if (jugador.reyEnJaque() && !ValidadorDeJugadas.existeJugadaParaResolverJaque(jugador)) {
            AdministradorDeMensajesWebsocket.notificarFinalDePartida("mate", oponente, jugador);
        }
        if (ValidadorDeJugadas.reyAhogado(jugador)) {
            AdministradorDeMensajesWebsocket.notificarFinalDePartida("ahogado", jugador, oponente);
        }

        if (colorDeUsuarioActual === color) {
            administradorDeElementosHTML.agregarListenersParaDetectarSeleccionDePieza(jugador);
            administradorDeInterfazDeTablero.resaltarCasillas(jugador.obtenerCasillasOcupadas());
        }
        if (oponente.obtenerPiezaSeleccionada()) {
            administradorDeElementosHTML.removerListenersParaRealizarJugada();
            administradorDeInterfazDeTablero.quitarResaltadoACasillas(tablero.casillas);
            oponente.obtenerPiezaSeleccionada().seleccionada = false;
        }
    }


    static ejecutarJugada(jugada) {
        console.log("ejecutarJugada()");
        let esLegal = ValidadorDeJugadas.validarJugada(jugada);
        let esJugadaDeEnroque = ValidadorDeJugadas.esJugadaDeEnroque(jugada);
        let esJugadaDeCapturaAlPaso = ValidadorDeJugadas.esJugadaDeCapturaAlPaso(jugada);

        if (esLegal) {
            administradorDeInterfazDeTablero.quitarImagenDePiezaACasilla(jugada.casillaDePartida);
            administradorDeInterfazDeTablero.quitarImagenDePiezaACasilla(jugada.casillaAtacada); //no contempla captura al paso

            if (esJugadaDeEnroque) {
                const { casillaDeRey, casillaDeTorre } = jugada.jugador.enrocar(jugada);
                administradorDeInterfazDeTablero.asignarImagenDePiezaACasilla(casillaDeRey);
                administradorDeInterfazDeTablero.asignarImagenDePiezaACasilla(casillaDeTorre);

                jugada.casillaAtacada.contenedor.pieza = null;//flags del contenedor de la casilla de la torre
                jugada.casillaAtacada.contenedor.jugador = null;
            }
            else if (esJugadaDeCapturaAlPaso) {
                let peonCapturado = jugada.jugador.capturarAlPaso(jugada);
                administradorDeInterfazDeTablero.quitarImagenDePiezaACasilla(peonCapturado.casilla);
                administradorDeInterfazDeTablero.asignarImagenDePiezaACasilla(jugada.casillaAtacada);

                peonCapturado.casilla.contenedor.pieza = null;
                peonCapturado.casilla.contenedor.jugador = null;
                peonCapturado.casilla.pieza = null;
                peonCapturado.enJuego = false;
                peonCapturado.casilla = null;
            }
            else {
                jugada.jugador.moverPieza(jugada);
                administradorDeInterfazDeTablero.asignarImagenDePiezaACasilla(jugada.casillaAtacada);
            }

            jugada.casillaDePartida.contenedor.pieza = null;
            jugada.casillaDePartida.contenedor.jugador = null;

            let oponente = partida.obtenerOponente(jugada.jugador);
            jugada.jugador.turnoActivo = false;
            oponente.turnoActivo = true;

            this.empezarTurnoDeJugador(oponente.color);
            partida.guardarJugada(jugada);
            partida.siguienteTurno();
        }
        else {
            //reinicio el turno de jugador si realiza una jugada invalida
            this.empezarTurnoDeJugador(jugada.jugador.color);
            if (jugada.jugador.obtenerPiezaSeleccionada()) {
                let casillasDisponibles = jugada.jugador.obtenerPiezaSeleccionada().casillasDisponiblesParaMovimiento();
                administradorDeElementosHTML.removerListenersParaRealizarJugada();
                administradorDeInterfazDeTablero.quitarResaltadoACasillas(casillasDisponibles);
                jugada.jugador.obtenerPiezaSeleccionada().seleccionada = false;
            }
        }
    }


    static finalizarPartida() {

    }

}

export { AdministradorDeEventosDePartida };