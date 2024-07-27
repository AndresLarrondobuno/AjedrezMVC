function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function rango(inicio, fin) {
    if (inicio === fin) return [inicio];
    return [inicio, ...rango(inicio + 1, fin)];
}

function esPar(numero) {
    return numero % 2 === 0;
}

function espejarCoordenadas(x, y) {
    const xReflejado = espejarCoordenada(x);
    const yReflejado = espejarCoordenada(y);
    return { x: xReflejado, y: yReflejado };
}


function espejarCoordenada(coordenada) {
    const TAMANIO_GRILLA = 8;
    const reflejo = Math.abs(coordenada - TAMANIO_GRILLA - 1);
    return reflejo;
}


function primeraLetraMayuscula(cadena) {
    if (cadena.length === 0) return "";
    return cadena[0].toUpperCase() + cadena.slice(1);
}

function obtenerIdDePartida() {
    return document.getElementById("datosPartida").dataset.id;
}

function obtenerRolDePartidaDeUsuario() {
    return document.getElementById("datosPartida").dataset.rolUsuario;
}

async function agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados) {
    for (let i = 0; i < resultados.length; i++) {
        let opcion = document.createElement("option");
        opcion.text = resultados[i];
        elementoSelect.appendChild(opcion);
    }
}

async function eliminarElementosHijos(elementoHTML) {
    elementoHTML.innerHTML = '';
}

const csrftoken = getCookie('csrftoken');

export {
    csrftoken,
    obtenerIdDePartida,
    rango,
    esPar,
    primeraLetraMayuscula,
    espejarCoordenada,
    espejarCoordenadas,
    agregarOpcionesASelectAPartirDeResultadosDeBusqueda,
    eliminarElementosHijos,
    obtenerRolDePartidaDeUsuario,
};