import { obtenerRolDePartidaDeUsuario } from "../../../static/js/funcionesAuxiliares.js";
import { administradorDeConexionWebsocket } from "./conexionwebsocket/administradorDeConexionWebsocket.js";
import { AdministradorDeMensajesWebsocket } from "./conexionwebsocket/administradorDeMensajesWebsocket.js";
import { partida } from "./main.js";


class AdministradorDeEventosDePartida {


    static seleccionarPieza(pieza) {
        pieza.seleccionada = true;
    }

    static actualizarEstadoDePartida(event) {
        event.preventDefault();
        console.log("target: ", event.target);
        let idPartida = partida.id;
        let rolUsuario = obtenerRolDePartidaDeUsuario();
        let jugada = "a2 a3"; //hardcodeado para testeo

        let datos = {
            "message":
            {
                "idPartida": idPartida,
                "rolUsuario": rolUsuario,
                "jugada": jugada,
            },
            "type": "actualizacion_de_estado_de_partida",
        }

        AdministradorDeMensajesWebsocket.enviarMensajeAConsumidor(administradorDeConexionWebsocket.websocket, datos);

    }
}

export { AdministradorDeEventosDePartida };