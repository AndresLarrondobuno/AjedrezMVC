import { AdministradorDeEventosDePartida } from "./administradorDeEventosDePartida.js";
import { AdministradorDeMensajesWebsocket } from "./conexionwebsocket/administradorDeMensajesWebsocket.js";

class AdministradorDeElementosHTML {
    
    static asignarContenedoresACasillas(tablero) {
        tablero.casillas.forEach(casilla => {
            AdministradorDeElementosHTML.asignarContenedorACasilla(casilla);
        });
    }


    static asignarContenedorACasilla(casilla) {
        let contenedorFila = document.getElementById(`fila${casilla.fila}`);
        let contenedorCasilla = contenedorFila.children[casilla.columna];
        casilla.contenedor = contenedorCasilla;
    }


    static agregarListenersParaComunicarSeleccionDePiezaACasillasOcupadas(jugador) {
        let casillasOcupadas = jugador.obtenerCasillasOcupadas();
        casillasOcupadas.forEach(casilla => {
            casilla.contenedor.addEventListener("click", AdministradorDeElementosHTML.agregarListenerACasillasLegales);
            casilla.contenedor.pieza = casilla.pieza;
        });
    }


    static agregarListenerACasillasLegales(event) {
        let pieza = event.currentTarget.pieza;
        //obtener jugadas legales para activar los listeners de las casillas que la pieza puede ocupar
        //chequear que respete patron de movimiento
        //chequear que no ataque piezas aliadas
        //chequear que no deje al rey en jaque (requiere definir metodo enJaque para el rey)
    }
    

    static agregarListenerAFormularioParaEnvioDeMensajesWebsocketAServidor() {
        let formularioParaEnviarMensajeAServidor = document.getElementById("formularioParaEnviarMensajeAServidor");
        formularioParaEnviarMensajeAServidor.addEventListener('submit', AdministradorDeMensajesWebsocket.enviarMensajeDeUsuario);
    }

    

}


export { AdministradorDeElementosHTML };