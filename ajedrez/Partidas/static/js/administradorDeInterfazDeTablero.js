import { esPar, espejarCoordenada, obtenerRolDePartidaDeUsuario } from "../../../static/js/funcionesAuxiliares.js";

class AdministradorDeInterfazDeTablero {
    constructor(tablero) {
        this._tablero = tablero;
    }

    get tablero() { return this._tablero }


    asignarColorAContenedoresDeCasillas() {
        this.tablero.casillas.forEach(casilla => {
            this.asignarColorAContenedorDeCasilla(casilla);
        });
    }


    asignarColorAContenedorDeCasilla(casilla) {

        if (esPar(casilla.fila + casilla.columna)) {
            casilla.contenedor.classList.add("casillaOscura");
        }
        else {
            casilla.contenedor.classList.add("casillaClara");
        }
    }


    asignarImagenesDePiezasACasillas() {
        this.tablero.casillas.forEach(casilla => {
            this.asignarImagenDePiezaACasilla(casilla);
        });
    }


    asignarImagenDePiezaACasilla(casilla) {
        if (casilla.pieza) {
            let imagenPieza = document.getElementById(casilla.pieza.idContenedorImagen);
            let clonImagen = imagenPieza.cloneNode();
            casilla.contenedor.appendChild(clonImagen);
        }
    }


    quitarImagenDePiezaACasilla(casilla) {
        if (casilla.pieza) {
            let imagenPieza = casilla.contenedor.firstChild;
            casilla.contenedor.removeChild(imagenPieza);
        }
    }


    agregarNomenclaturaParaCasilla(casilla) {
        let contenedorNomenclaturaFila = document.createElement("div");
        let contenedorNomenclaturaColumna = document.createElement("div");
        let contenedorOverlay = document.getElementById("overlayTablero");
        contenedorOverlay.appendChild(contenedorNomenclaturaFila);
        contenedorNomenclaturaFila.textContent = `${casilla.fila}`;

        contenedorOverlay.appendChild(contenedorNomenclaturaColumna);
        contenedorNomenclaturaFila.textContent = `${casilla.columna}`;
    }


    resaltarCasillas(casillas) {
        casillas.forEach(casilla => {
            this.resaltarCasilla(casilla);
        });
    }


    resaltarCasilla(casilla) {
        casilla.contenedor.classList.add('casillaResaltada');
    }


    quitarResaltadoACasilla(casilla) {
        casilla.contenedor.classList.remove('casillaResaltada');
    }


    quitarResaltadoACasillas(casillas) {
        casillas.forEach(casilla => {
            this.quitarResaltadoACasilla(casilla);
        });
    }
}


export { AdministradorDeInterfazDeTablero };