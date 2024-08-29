import { partida, tablero, administradorDeElementosHTML } from "../main.js";
import { administradorDeConexionWebsocket } from "./administradorDeConexionWebsocket.js";
import { AdministradorDeInterfazDeChat } from "../administradorDeInterfazDeChat.js"
import {
    obtenerRolDePartidaDeUsuario,
} from "../../../../static/js/funcionesAuxiliares.js";
import { AdministradorDeEventosDePartida } from "../administradorDeEventosDePartida.js";
import { Jugada } from "../jugada.js";


class AdministradorDeMensajesWebsocket {

    static async enviarMensajeAConsumidor(websocket, mensaje) {
        console.log("mensaje websocket: ", mensaje);
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
        if (respuesta.type === 'finalizacion_de_partida') {
            //guardar partida
            let motivo = respuesta.message.motivo;
            console.log("partida finalizada por: ", respuesta.message.motivo);
            if (motivo === "mate")
                console.log("ganador / perdedor: ", respuesta.message.color_ganador, " / ", respuesta.message.color_perdedor);
            else {
                console.log(`La partida terminó en empate por ${motivo}`)
            }
        }
    }


    static async notificarJugada(event, jugador, casillaDePartida) {
        let idPartida = partida.id;
        let rolUsuario = obtenerRolDePartidaDeUsuario();

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


    static async notificarFinalDePartida(motivo, ganador, perdedor) {
        let mensaje = {
            "message": {
                "motivo": motivo,
            },
            "type": "finalizacion_de_partida",
        };

        switch (motivo) {
            case "mate":
                mensaje["message"]['resultado'] = `$victoria_${ganador.color}`;
                mensaje["message"]['color_ganador'] = ganador.color;
                mensaje["message"]['color_perdedor'] = perdedor.color;
                break;
            case "ahogado":
            case "repeticion":
                mensaje["message"]['resultado'] = 'empate';
                break;
            default:
                console.log("Error notificando el final de partida al servidor.")
        }

        AdministradorDeMensajesWebsocket.enviarMensajeAConsumidor(administradorDeConexionWebsocket.websocket, mensaje);
    }


    static manejarMensajeDeUsuario(respuesta) {
        let mensaje = respuesta.message;
        AdministradorDeInterfazDeChat.imprimirMensajeDeUsuario(mensaje);
    }


    static enviarMensajeDeUsuario(event) {
        event.preventDefault();

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