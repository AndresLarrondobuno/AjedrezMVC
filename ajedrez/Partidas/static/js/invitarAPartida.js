import {
    csrftoken,
    agregarOpcionesASelectAPartirDeResultadosDeBusqueda, 
    eliminarElementosHijos,
} 
from "../../../static/js/funcionesAuxiliares.js";

async function buscarUsuarioPorSubstring() {
    let busqueda = this.value;
    let elementoSelect = this.nextElementSibling;
    let url = `/usuarios/buscar_nombres_de_usuario/?busqueda=${busqueda}`;

    const respuesta = await fetch(url);
    const resultados = await respuesta.json();

    console.log(resultados);

    if (!resultados.ok) {
        await eliminarElementosHijos(elementoSelect);
        await agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados);
    }
}


async function invitarAPartida(event) {
    event.preventDefault();
    let selectNombreOponente = document.getElementById("opcionesUsuarios");

    let oponenteFueSeleccionado = selectNombreOponente.selectedIndex >= 0;

    if (oponenteFueSeleccionado) {
        let indiceNombreSeleccionado = selectNombreOponente.selectedIndex;
        let nombreOponente = selectNombreOponente[indiceNombreSeleccionado].textContent;
    
        let datos = {
            "nombreOponente" : nombreOponente,
        };

        let jsonDatos = JSON.stringify(datos);

        let url = `/partidas/crear_invitacion_a_partida/`;

        let headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        }

        const respuesta = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: jsonDatos,
        });


        if (respuesta.ok) {
            console.log("invitacion enviada al servidor...");
            window.location.href = "/";
        }
    }
    else {
        if (!oponenteFueSeleccionado){
            console.log("No seleccionaste un oponente.")
        }
    }

}

let inputNombreOponente = document.getElementById("nombreOponente");
let formularioDeBusquedaDeOponente = document.getElementById("formularioBuscarOponente");
formularioDeBusquedaDeOponente.addEventListener("submit", invitarAPartida);
inputNombreOponente.addEventListener("input", buscarUsuarioPorSubstring);