import { AdministradorDeMensajesWebsocket } from "./conexionwebsocket/administradorDeMensajesWebsocket.js";
import { tablero, partida, administradorDeInterfazDeTablero } from "./main.js";


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
        let casillasOcupadas = jugador.obtenerCasillasOcupadas();
        console.log(casillasOcupadas);

        casillasOcupadas.forEach(casilla => {
            this.agregarListenerParaDetectarSeleccionDePieza(jugador, casilla);
            casilla.contenedor.classList.add("casillaResaltada");
        });

    }


    agregarListenerParaDetectarSeleccionDePieza(jugador, casillaDePartida) {
        const listener = (event) => {
            this.agregarListenersATableroParaRealizarJugada(event, jugador);
        };

        casillaDePartida.contenedor.addEventListener("click", listener);
        this.listenersParaDetectarSeleccionDePieza.push(listener);
    }


    agregarListenerParaRealizarJugada(event, jugador, casilla) {
        let casillaDePartida = event.currentTarget.casilla;

        const listener = (event) => {
            AdministradorDeMensajesWebsocket.notificarJugada(event, jugador, casillaDePartida);
        };

        casilla.contenedor.addEventListener("click", listener);
        this.listenersParaRealizarJugada.push(listener);
    }


    agregarListenersATableroParaRealizarJugada(event, jugador) {
        this.removerListenersParaDetectarSeleccionDePieza(jugador);
        let piezaSeleccionada = event.currentTarget.casilla.pieza;
        piezaSeleccionada.seleccionada = true;
        let casillasDisponibles = piezaSeleccionada.casillasDisponiblesParaMovimiento();
        administradorDeInterfazDeTablero.resaltarCasillas(casillasDisponibles);
        
        tablero.casillas.forEach(casilla => {
            this.agregarListenerParaRealizarJugada(event, jugador, casilla);
        });
    };


    removerListenersParaDetectarSeleccionDePieza(jugador) {
        let casillasOcupadas = jugador.obtenerCasillasOcupadas();

        casillasOcupadas.forEach((casilla, indice) => {
            casilla.contenedor.removeEventListener("click", this.listenersParaDetectarSeleccionDePieza[indice]);
            casilla.contenedor.classList.remove("casillaResaltada");
        });

        this.listenersParaDetectarSeleccionDePieza.length = 0;
    }


    removerListenersParaRealizarJugada() {
        console.log("removerListenersParaRealizarJugada()");

        tablero.casillas.forEach((casilla, indice) => {
            casilla.contenedor.removeEventListener("click", this.listenersParaRealizarJugada[indice]);
        });
        this.listenersParaRealizarJugada.length = 0; //vacia el array que contiene referencias a los listeners,creo que son nulls en este momento
        
    }


    agregarListenerAFormularioParaEnvioDeMensajesWebsocketAServidor() {
        let formularioParaEnviarMensajeAServidor = document.getElementById("formularioParaEnviarMensajeAServidor");
        formularioParaEnviarMensajeAServidor.addEventListener('submit', AdministradorDeMensajesWebsocket.enviarMensajeDeUsuario);
    }


}

export { AdministradorDeElementosHTML };