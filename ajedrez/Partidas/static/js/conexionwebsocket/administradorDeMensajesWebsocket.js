import { partida } from "../main.js";
import { administradorDeConexionWebsocket } from "./administradorDeConexionWebsocket.js";
import { AdministradorDeInterfazDeChat } from "../administradorDeInterfazDeChat.js"
import {
    obtenerRolDePartidaDeUsuario,
} from "../../../../static/js/funcionesAuxiliares.js";
import { AdministradorDeElementosHTML } from "../administradorDeElementosHTML.js";


class AdministradorDeMensajesWebsocket {

    static async enviarMensajeAConsumidor(websocket, mensaje) {
        websocket.send(JSON.stringify(mensaje));
    };

    static manejarMensajeWebsocketDeServidor(evento) {

        let respuesta = JSON.parse(evento.data);

        if (respuesta.type === 'mensaje_de_usuario') {
            AdministradorDeMensajesWebsocket.manejarMensajeDeUsuario(respuesta);
        }

        if (respuesta.type === 'conexion_establecida') {
            console.log(respuesta);
        }
        if (respuesta.type === 'actualizacion_de_estado_de_partida') {
            //objeto partida actualiza el estado del tablero: ejecutarJugada()
            console.log(respuesta);
        }
    }


    static manejarMensajeDeUsuario(respuesta) {
        let mensaje = respuesta.message;
        AdministradorDeInterfazDeChat.imprimirMensajeDeUsuario(mensaje);
    }


    static enviarMensajeDeUsuario(event) {
        event.preventDefault();
        console.log("enviarMensajeDeUsuario() ejecutado desde AdministradorDeMensajesWebsocket");

        let mensaje = event.target.contenido.value;
        let username = event.target.dataset.username;

        let mensajeJSON = JSON.stringify({
            'message': mensaje,
            'type': 'mensaje_de_usuario',
            'username': username,
        });

        administradorDeConexionWebsocket.websocket.send(mensajeJSON);

        formularioParaEnviarMensajeAServidor.reset();
    }

}

AdministradorDeElementosHTML.agregarListenerAFormularioParaEnvioDeMensajesWebsocketAServidor();
administradorDeConexionWebsocket.websocket.onmessage = AdministradorDeMensajesWebsocket.manejarMensajeWebsocketDeServidor;

export { AdministradorDeMensajesWebsocket };