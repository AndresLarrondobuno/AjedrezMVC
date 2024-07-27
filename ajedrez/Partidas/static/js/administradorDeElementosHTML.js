
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


    static agregarListenerAPiezas(jugador) {
        let casillasOcupadas = jugador.obtenerCasillasOcupadas();
        casillasOcupadas.forEach(casilla => {
            let contenedor = AdministradorDeElementosHTML.obtenerContenedorDeCasilla(casilla);
            contenedor.addEventListener("click", callback());
        });
    }

}



export { AdministradorDeElementosHTML };