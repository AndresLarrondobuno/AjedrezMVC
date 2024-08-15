
class ValidadorDeJugadas {
    static validarJugada(jugada) {
        if (ValidadorDeJugadas.respetaPatronDeMovimiento(jugada) && !ValidadorDeJugadas.atacaPiezaAliada(jugada) && !ValidadorDeJugadas.generaAutoJaque(jugada)){

        }
    }


    static respetaPatronDeMovimiento(jugada) {

    }


    static atacaPiezaAliada(jugada) {

    }


    static generaAutoJaque(jugada) {

    }
}


export { ValidadorDeJugadas };