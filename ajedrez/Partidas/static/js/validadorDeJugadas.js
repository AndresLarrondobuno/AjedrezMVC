import { Jugada } from "./jugada.js";
import { partida, tablero } from "./main.js";

class ValidadorDeJugadas {
    static validarJugada(jugada) {
        if (ValidadorDeJugadas.esJugadaDeEnroque(jugada)) {
            return ValidadorDeJugadas.validarEnroque(jugada);
        }

        let respetaPatronDeMovimiento = ValidadorDeJugadas.respetaPatronDeMovimiento(jugada);
        let atacaPiezaAliada = ValidadorDeJugadas.atacaPiezaAliada(jugada);
        let generaAutoJaque = ValidadorDeJugadas.generaAutoJaque(jugada);

        return (respetaPatronDeMovimiento && !atacaPiezaAliada && !generaAutoJaque);
    }


    static validarEnroque(jugada) {
        let generaAutoJaque = ValidadorDeJugadas.generaAutoJaque(jugada);
        let reyEnJaque = jugada.jugador.reyEnJaque();
        let torreAtacada = jugada.casillaAtacada.bajoAtaque(jugada.jugador)['bajoAtaque'];
        let escaquesBajoAtaque = ValidadorDeJugadas.escaquesBajoAtaque(jugada);
        let escaquesVacios = ValidadorDeJugadas.escaquesVacios(jugada);
        let reySeMovioDurantePartida = partida.piezaFueMovida(jugada.piezaAtacante);
        let torreSeMovioDurantePartida = partida.piezaFueMovida(jugada.piezaAtacada);

        return !generaAutoJaque && !reyEnJaque && !torreAtacada && !escaquesBajoAtaque && escaquesVacios && !reySeMovioDurantePartida && !torreSeMovioDurantePartida;
    }


    static esJugadaDeEnroque(jugada) {
        let jugadaDeRey = jugada.piezaAtacante.tipo === "rey";
        let atacaPiezaAliada = ValidadorDeJugadas.atacaPiezaAliada(jugada);
        let atacaTorre = jugada.piezaAtacada ? jugada.piezaAtacada.tipo === "torre" : false;
        return jugadaDeRey && atacaPiezaAliada && atacaTorre;
    }


    static esJugadaDeCapturaAlPaso(jugada) {
        let anteriorJugada;
        if (Object.keys(partida.jugadas).length !== 0) {
            anteriorJugada = partida.obtenerTurnoAnterior();
        }
        else return false;

        //console.log("turnoActual: ", partida.turnoActual);
        let anteriorJugadaEsDePeon = anteriorJugada.piezaAtacante.tipo === 'peon';
        let atacaColumnaAdyacente = (jugada.casillaAtacada.distanciaHorizontal(jugada.casillaDePartida) === 1);
        let anteriorJugadaParteDeCasillaInicial;
        let enFilaCorrecta;

        let casillaDePeonAtacado = tablero.obtenerCasillaAPartirDeCoordenadas(jugada.casillaAtacada.columna, jugada.casillaDePartida.fila);
        let existePeonAdyacente = casillaDePeonAtacado.pieza ? (casillaDePeonAtacado.pieza.tipo === "peon") : false;

        if (jugada.casillaDePartida.pieza.color === 'blanco') {
            enFilaCorrecta = jugada.casillaDePartida.distanciaVertical(tablero.filaDePromocionDeBlancas[0]) === 3;
            anteriorJugadaParteDeCasillaInicial = (anteriorJugada.casillaDePartida.fila === 7);
        }
        else {
            enFilaCorrecta = jugada.casillaDePartida.distanciaVertical(tablero.filaDePromocionDeNegras[0]) === 3;
            anteriorJugadaParteDeCasillaInicial = (anteriorJugada.casillaDePartida.fila === 2);
        }

        //console.log(`${enFilaCorrecta}/${anteriorJugadaEsDePeon}/${anteriorJugadaParteDeCasillaInicial}/${atacaColumnaAdyacente}/${existePeonAdyacente}`);
        return (enFilaCorrecta && anteriorJugadaEsDePeon && anteriorJugadaParteDeCasillaInicial && atacaColumnaAdyacente && existePeonAdyacente);

    }


    static escaquesBajoAtaque(jugada) {
        let escaquesBajoAtaque = false;
        jugada.ruta.forEach(casilla => {
            if (casilla.bajoAtaque(jugada.jugador)['bajoAtaque']) {
                escaquesBajoAtaque = true;
                return;
            }
        });
        return escaquesBajoAtaque;
    }


    static escaquesVacios(jugada) {
        let escaquesVacios = true;
        jugada.ruta.forEach(casilla => {
            if (casilla.pieza) {
                escaquesVacios = false;
                return;
            }
        });
        return escaquesVacios;
    }


    static respetaPatronDeMovimiento(jugada) {
        return jugada.piezaAtacante.respetaPatronDeMovimiento(jugada);
    }


    static atacaPiezaAliada(jugada) {
        if (jugada.piezaAtacada) {
            return jugada.piezaAtacante.color === jugada.piezaAtacada.color;
        }
        else { return false };
    }


    static generaAutoJaque(jugada) {
        let rey = jugada.jugador.obtenerRey();
        let autojaque = false;
        if (jugada.piezaAtacada !== rey) {
            jugada.jugador.moverPieza(jugada);
            autojaque = jugada.jugador.reyEnJaque();
            tablero.deshacerJugada(jugada);
        }
        return autojaque;
    }


    static saltaPieza(jugada) {
        return jugada.poseePiezaEnRutaDeMovimiento();
    }


    static existeJugadaParaResolverJaque(jugador) {
        let rey = jugador.obtenerRey();
        let { piezasAtacantes: piezasQueAmenazanAlRey } = rey.casilla.bajoAtaque(jugador);
        let piezasDefensoras = jugador.obtenerPiezasEnJuego();
        let existeJugadaParaResolverJaque = false;

        piezasQueAmenazanAlRey.forEach(pieza => {
            let casillasDisponiblesParaMovimiento = pieza.casillasDisponiblesParaMovimiento();

            casillasDisponiblesParaMovimiento.forEach(casilla => {

                piezasDefensoras.forEach(piezaDefensora => {

                    let jugadaDeDefensa = new Jugada(jugador, piezaDefensora.casilla, casilla);
                    let jugadaEsValida = ValidadorDeJugadas.validarJugada(jugadaDeDefensa);
                    if (jugadaEsValida) {
                        existeJugadaParaResolverJaque = true;
                        return;
                    }
                });

                if (existeJugadaParaResolverJaque) return;
            });

            if (existeJugadaParaResolverJaque) return;
        });
        return existeJugadaParaResolverJaque;
    }


    static reyAhogado(jugador) {
        let piezasDefensoras = jugador.obtenerPiezasEnJuego();
        let reyEnJaque = jugador.reyEnJaque();
        let existeJugadaLegal;

        piezasDefensoras.forEach(piezaDefensora => {

            let casillasDisponibles = piezaDefensora.casillasDisponiblesParaMovimiento();

            casillasDisponibles.forEach(casilla => {

                let jugadaDeDefensa = new Jugada(jugador, piezaDefensora.casilla, casilla);
                let jugadaEsValida = ValidadorDeJugadas.validarJugada(jugadaDeDefensa);
                if (jugadaEsValida) {
                    existeJugadaLegal = true;
                    return;
                }
            });
            if (existeJugadaLegal) return;
        });

        return !reyEnJaque && !existeJugadaLegal;
    }

}


export { ValidadorDeJugadas };