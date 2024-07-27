import { obtenerIdDePartida } from "../../../../static/js/funcionesAuxiliares.js";

class AdministradorDeConexionWebsocket {

    constructor() {
        this._websocket = this.iniciarConexionWebsocket();
    }


    get websocket() {
        return this._websocket
    }
    

    iniciarConexionWebsocket() {
        let idPartida = obtenerIdDePartida();
        let url = `ws://${window.location.host}/ws/partidas/partida_${idPartida}/`;
        console.log("URL WS:", url);

        let websocket = new WebSocket(url);
        return websocket
    }


    finalizarConexionWebsocket() {
        this.websocket.close();
    }
}

let administradorDeConexionWebsocket = new AdministradorDeConexionWebsocket();

export { administradorDeConexionWebsocket };