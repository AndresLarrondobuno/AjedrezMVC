import { csrftoken } from "../../../static/js/funcionesAuxiliares.js";

async function aceptarInvitacion() {
    let contenedorInvitacion = this.parentElement;
    let idInvitacion = contenedorInvitacion.dataset.invitacionId;

    let url = "/partidas/aceptar_invitacion/";

    let datos = JSON.stringify({
        "idInvitacion": idInvitacion,
    })

    let headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    };

    const respuesta = await fetch(url, {
        method: "POST",
        headers: headers,
        body: datos,
    });

    if (respuesta.ok) {
        console.log("invitacion aceptada", "id: ", idInvitacion);
        crearPartida(idInvitacion);
        //borrarInvitacion();
    }
}


async function crearPartida(idInvitacion) {
    console.log("id de partida (db): ", idInvitacion);

    let datos = {
        "idInvitacion": idInvitacion,
    };

    let jsonDatos = JSON.stringify(datos);

    let url = "/partidas/crear_partida/";

    let headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    };

    const respuesta = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: jsonDatos,
    });

    if (respuesta.ok) {
        console.log("Partida guardada en el servidor.");

        respuesta.json().then(datos => {
            const idPartida = datos.idPartida;
            redireccionarASalaDePartida(idPartida);

        }).catch(error => {
            console.error("Error al procesar la respuesta JSON:", error);
        });

    }
    else {
        console.log("Hubo un error en la creacion de la batalla.");
    }
}

async function redireccionarASalaDePartida(idPartida) {
    let url = `/partidas/partida_${idPartida}`;
    window.location.href = `/partidas/invitaciones_pendientes/`;
    window.open(url, "_blank");
}


let contenedoresDeInvitaciones = document.getElementsByClassName("contenedorInvitacion");
contenedoresDeInvitaciones = Array.from(contenedoresDeInvitaciones);

contenedoresDeInvitaciones.forEach(contenedor => {
    let botonAceptarInvitacion = document.createElement("button");
    botonAceptarInvitacion.classList.add("boton");
    botonAceptarInvitacion.innerHTML = "Aceptar Invitación";
    botonAceptarInvitacion.addEventListener("click", aceptarInvitacion);
    contenedor.appendChild(botonAceptarInvitacion);
});