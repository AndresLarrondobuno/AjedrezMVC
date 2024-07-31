class Jugador {
    constructor(rol, color, tablero) {
        this._rol = rol;
        this._color = color;
        if (color === 'blanco') {
            this._piezas = tablero.piezasBlancas;
        }
        if (color === 'negro') {
            this._piezas = tablero.piezasNegras;
        }

        this._turnoActivo = null;
    }

    get rol() { return this._rol }
    get color() { return this._color }
    get piezas() { return this._piezas }
    get turnoActivo() { return this._turnoActivo }
    set turnoActivo(bool) { this._turnoActivo = bool }


    obtenerCasillasOcupadas() {
        let casillasOcupadas = [];
        this.piezas.forEach(pieza => {
            casillasOcupadas.push(pieza.casilla);

        });
        return casillasOcupadas;
    }


    moverPieza(jugada) {

    }

}

export { Jugador };