import { partida, tablero, administradorDeElementosHTML } from "../main.js";
import { administradorDeConexionWebsocket } from "./administradorDeConexionWebsocket.js";
import { AdministradorDeInterfazDeChat } from "../administradorDeInterfazDeChat.js"
import {
    obtenerRolDePartidaDeUsuario,
} from "../../../../static/js/funcionesAuxiliares.js";
import { AdministradorDeEventosDePartida } from "../administradorDeEventosDePartida.js";
import { ValidadorDeJugadas } from "../validadorDeJugadas.js";
import { Jugada } from "../jugada.js";


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
            console.log("conexion establecida con exito");
        }
        if (respuesta.type === 'validacion_de_jugada') {
            let columnaCasillaDePartida = respuesta.message.jugada.columnaCasillaDePartida;
            let filaCasillaDePartida = respuesta.message.jugada.filaCasillaDePartida;
            let columnaCasillaAtacada = respuesta.message.jugada.columnaCasillaAtacada;
            let filaCasillaAtacada = respuesta.message.jugada.filaCasillaAtacada;

            let casillaDePartida = tablero.obtenerCasillaAPartirDeCoordenadas(columnaCasillaDePartida, filaCasillaDePartida);
            let casillaAtacada = tablero.obtenerCasillaAPartirDeCoordenadas(columnaCasillaAtacada, filaCasillaAtacada);

            let color = respuesta.message.color;
            let jugador = partida.obtenerJugadorPorColor(color);

            let jugada = new Jugada(jugador, casillaDePartida, casillaAtacada);
            AdministradorDeEventosDePartida.ejecutarJugada(jugada);
        }
    }


    static async notificarJugada(event, jugador, casillaDePartida) {
        console.log("notificarJugada()");
        let idPartida = partida.id;
        let rolUsuario = obtenerRolDePartidaDeUsuario();
        console.log("-casillaAtacada: ", event.currentTarget);
        console.log("-event: ", event);

        let casillaAtacada = event.currentTarget.casilla;
        
        let datos = {
            "message":
            {
                "idPartida": idPartida,
                "rolUsuario": rolUsuario,
                "color": jugador.color,
                "jugada": {
                    "columnaCasillaDePartida": casillaDePartida.columna,
                    "filaCasillaDePartida": casillaDePartida.fila,
                    "columnaCasillaAtacada": casillaAtacada.columna,
                    "filaCasillaAtacada": casillaAtacada.fila,
                }
            },
            "type": "validacion_de_jugada",
        }

        await AdministradorDeMensajesWebsocket.enviarMensajeAConsumidor(administradorDeConexionWebsocket.websocket, datos);
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

administradorDeElementosHTML.agregarListenerAFormularioParaEnvioDeMensajesWebsocketAServidor();
administradorDeConexionWebsocket.websocket.onmessage = AdministradorDeMensajesWebsocket.manejarMensajeWebsocketDeServidor;

export { AdministradorDeMensajesWebsocket };