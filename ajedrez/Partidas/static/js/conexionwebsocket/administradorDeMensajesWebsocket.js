import { partida } from "../main.js";
import { administradorDeConexionWebsocket } from "./administradorDeConexionWebsocket.js";
import { AdministradorDeInterfazDeChat } from "../administradorDeInterfazDeChat.js"
import {
    obtenerRolDePartidaDeUsuario,
} from "../../../../static/js/funcionesAuxiliares.js";


class AdministradorDeMensajesWebsocket {

    static manejarMensajeWebsocketDeServidor(evento) {

        let respuesta = JSON.parse(evento.data);

        if (respuesta.type === 'mensajeDeUsuario') {
            AdministradorDeMensajesWebsocket.manejarMensajeDeUsuario(respuesta);
        }

        if (respuesta.type === 'conexion_establecida') {
            console.log(respuesta);
        }
        if (respuesta.type === 'jugada_decidida') {
            console.log(respuesta);
        }
    }


    static manejarMensajeDeUsuario(respuesta) {
        let mensaje = respuesta.message;
        AdministradorDeInterfazDeChat.imprimirMensajeDeUsuario(mensaje);
    }


    static enviarMensajeDeUsuarioViaWebsocket(event) {
        event.preventDefault();
        console.log("enviarMensajeDeUsuarioViaWebsocket() ejecutado desde AdministradorDeMensajesWebsocket");

        let mensaje = event.target.contenido.value;
        let username = event.target.dataset.username;

        let mensajeJSON = JSON.stringify({
            'message': mensaje,
            'type': 'mensajeDeUsuario',
            'username': username,
        });

        administradorDeConexionWebsocket.websocket.send(mensajeJSON);

        formularioParaEnviarMensajeAServidor.reset();
    }


    static agregarListenerAFormularioParaEnvioDeMensajesWebsocketAServidor() {
        let formularioParaEnviarMensajeAServidor = document.getElementById("formularioParaEnviarMensajeAServidor");
        formularioParaEnviarMensajeAServidor.addEventListener('submit', AdministradorDeMensajesWebsocket.enviarMensajeDeUsuarioViaWebsocket);
    }
}

AdministradorDeMensajesWebsocket.agregarListenerAFormularioParaEnvioDeMensajesWebsocketAServidor();
administradorDeConexionWebsocket.websocket.onmessage = AdministradorDeMensajesWebsocket.manejarMensajeWebsocketDeServidor;

export { AdministradorDeMensajesWebsocket };