import { AdministradorDeEventosDePartida } from "./administradorDeEventosDePartida.js";
import { AdministradorDeMensajesWebsocket } from "./conexionwebsocket/administradorDeMensajesWebsocket.js";
import { tablero, partida } from "./main.js";
import { Jugada } from "./jugada.js";
import { Casilla } from "./casilla.js";

class AdministradorDeElementosHTML {
    constructor() {
        this.listenersParaDetectarSeleccionDePieza = [];
        this.listenersParaRealizarJugada = [];
    }


    asignarContenedoresACasillas(tablero) {
        tablero.casillas.forEach(casilla => {
            this.asignarContenedorACasilla(casilla);
        });
    }


    asignarContenedorACasilla(casilla) {
        let contenedorFila = document.getElementById(`fila${casilla.fila}`);
        let contenedorCasilla = contenedorFila.children[casilla.columna];
        casilla.contenedor = contenedorCasilla;
        casilla.contenedor.casilla = casilla;
    }


    agregarListenersParaDetectarSeleccionDePieza(jugador) {
        console.log("agregarListenersParaDetectarSeleccionDePieza()");
        let casillasOcupadas = jugador.obtenerCasillasOcupadas();

        casillasOcupadas.forEach(casilla => {
            this.agregarListenerParaDetectarSeleccionDePieza(jugador, casilla);
            casilla.contenedor.classList.add("casillaResaltada");
        });

        console.log("-listeners para deteccion de seleccion de pieza agregados");
    }


    agregarListenerParaDetectarSeleccionDePieza(jugador, casillaDePartida) {
        console.log("agregarListenerParaDetectarSeleccionDePieza()");

        const listener = (event) => {
            this.agregarListenersATableroParaRealizarJugada(event, jugador);
        };

        casillaDePartida.contenedor.addEventListener("click", listener);
        this.listenersParaDetectarSeleccionDePieza.push(listener);

        let contenedorCasillaDePartida = casillaDePartida.contenedor;
        console.log("-contenedorCasillaDePartida: ", contenedorCasillaDePartida);
    }


    agregarListenerParaRealizarJugada(event, jugador, casilla) {
        console.log("agregarListenerParaRealizarJugada()");
        let casillaDePartida = event.currentTarget.casilla;

        const listener = (event) => {
            AdministradorDeMensajesWebsocket.notificarJugada(event, jugador, casillaDePartida);
        };

        casilla.contenedor.addEventListener("click", listener);
        this.listenersParaRealizarJugada.push(listener);
    }


    agregarListenersATableroParaRealizarJugada(event, jugador) {
        console.log("agregarListenersATableroParaRealizarJugada()");
        this.removerListenersParaDetectarSeleccionDePieza(jugador);

        tablero.casillas.forEach(casilla => {
            this.agregarListenerParaRealizarJugada(event, jugador, casilla);
            casilla.contenedor.classList.add("casillaResaltada");
        });

    };


    removerListenersParaDetectarSeleccionDePieza(jugador) {
        let casillasOcupadas = jugador.obtenerCasillasOcupadas();
        console.log("removerListenersParaDetectarSeleccionDePieza()");
        console.log("-casillasOcupadas: ", casillasOcupadas);

        casillasOcupadas.forEach((casilla, indice) => {
            casilla.contenedor.removeEventListener("click", this.listenersParaDetectarSeleccionDePieza[indice]);
            casilla.contenedor.classList.remove("casillaResaltada");
        });

        this.listenersParaDetectarSeleccionDePieza.length = 0;
        console.log("-listeners para deteccion de seleccion de pieza removidos");
    }


    removerListenersParaRealizarJugada() {
        console.log("removerListenersParaRealizarJugada()");
        console.log("-listeners para realizar jugada: ", this.listenersParaRealizarJugada);

        tablero.casillas.forEach((casilla, indice) => {
            casilla.contenedor.removeEventListener("click", this.listenersParaRealizarJugada[indice]);
            casilla.contenedor.classList.remove("casillaResaltada");
        });
        this.listenersParaRealizarJugada.length = 0; //vacia el array que contiene referencias a los listeners,creo que son nulls en este momento
        console.log("-listeners para realizar jugada removidos");
        
    }


    agregarListenerAFormularioParaEnvioDeMensajesWebsocketAServidor() {
        let formularioParaEnviarMensajeAServidor = document.getElementById("formularioParaEnviarMensajeAServidor");
        formularioParaEnviarMensajeAServidor.addEventListener('submit', AdministradorDeMensajesWebsocket.enviarMensajeDeUsuario);
    }


}

export { AdministradorDeElementosHTML };