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

    }

    get rol() { return this._rol }
    get color() { return this._color }
    get piezas() { return this._piezas }


    obtenerCasillasOcupadas() {
        let casillasOcupadas = [];
        this.piezas.forEach(pieza => {
            if (pieza.casilla) {
                casillasOcupadas.push(casilla);
            }
        });
        return casillasOcupadas;
    }


}

export { Jugador };