import { Rey, Reina, Torre, Caballo, Alfil, Peon } from "./pieza.js";

class PiezaFactory {

    static mapaDeCasillasInicialesDePiezas = {
        "1,1": "torre_blanco",
        "1,2": "caballo_blanco",
        "1,3": "alfil_blanco",
        "1,4": "reina_blanco",
        "1,5": "rey_blanco",
        "1,6": "alfil_blanco",
        "1,7": "caballo_blanco",
        "1,8": "torre_blanco",

        "2,1": "peon_blanco",
        "2,2": "peon_blanco",
        "2,3": "peon_blanco",
        "2,4": "peon_blanco",
        "2,5": "peon_blanco",
        "2,6": "peon_blanco",
        "2,7": "peon_blanco",
        "2,8": "peon_blanco",

        "7,1": "peon_negro",
        "7,2": "peon_negro",
        "7,3": "peon_negro",
        "7,4": "peon_negro",
        "7,5": "peon_negro",
        "7,6": "peon_negro",
        "7,7": "peon_negro",
        "7,8": "peon_negro",

        "8,1": "torre_negro",
        "8,2": "caballo_negro",
        "8,3": "alfil_negro",
        "8,4": "reina_negro",
        "8,5": "rey_negro",
        "8,6": "alfil_negro",
        "8,7": "caballo_negro",
        "8,8": "torre_negro",
    }


    static crearPiezaAPartirDeCasilla(casilla) {
        const nombre = PiezaFactory.obtenerNombreDePiezaAPartirDeCasilla(casilla);
        if (nombre) {
            const partes = nombre.split("_");
            const tipo = partes[0];
            const color = partes[1];

            switch (tipo) {
                case "rey": return new Rey(tipo, color, casilla);
                case "reina": return new Reina(tipo, color, casilla);
                case "torre": return new Torre(tipo, color, casilla);
                case "caballo": return new Caballo(tipo, color, casilla);
                case "alfil": return new Alfil(tipo, color, casilla);
                case "peon": return new Peon(tipo, color, casilla);
            }
        }
    }


    static obtenerNombreDePiezaAPartirDeCasilla(casilla) {
        let mapa = PiezaFactory.mapaDeCasillasInicialesDePiezas;
        let llave = `${casilla.fila},${casilla.columna}`;
        if (llave in mapa) {
            return mapa[llave];
        }
    }
}

export { PiezaFactory };