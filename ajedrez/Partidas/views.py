from django.shortcuts import render
from django.http import JsonResponse
from .models import Partida, Invitacion
from Usuarios.models import PerfilUsuario, User
import json
import random

class PartidasController(): 
    def partida(self, request, id):
        partida = Partida.objects.get(id=id)
        usuario_actual = request.user
        perfil_usuario_solicitante = partida.usuario_solicitante
        perfil_usuario_destinatario = partida.usuario_destinatario
        usuario_solicitante = perfil_usuario_solicitante.usuario
        usuario_destinatario = perfil_usuario_destinatario.usuario
        color_usuario_solicitante = partida.color_usuario_solicitante
        color_usuario_destinatario = partida.color_usuario_destinatario
        
        if usuario_solicitante == usuario_actual:
            rol_usuario = 'solicitante'
            rol_oponente = 'destinatario'
            color_usuario_actual = color_usuario_solicitante
        elif usuario_destinatario == usuario_actual:
            rol_usuario = 'destinatario'
            rol_oponente = 'solicitante'
            color_usuario_actual = color_usuario_destinatario


        contexto = {
            "id": id,
            'nombre_usuario_actual': usuario_actual.username,
            "rol_usuario": rol_usuario,
            "rol_oponente": rol_oponente,
            "color_usuario_actual": color_usuario_actual,
            "color_usuario_solicitante": color_usuario_solicitante,
            "color_usuario_destinatario": color_usuario_destinatario,
        }

        return render(request, 'partida.html', contexto)
    
    
    def crear_partida(self, request):
        color_usuario_solicitante = random.choice(['blanco', 'negro'])
        if color_usuario_solicitante == 'blanco':
            color_usuario_destinatario = 'negro'
        else:
            color_usuario_destinatario = 'blanco'
        
        datos = json.loads(request.body)
        id_invitacion = datos['idInvitacion']
        invitacion = Invitacion.objects.get(id=id_invitacion)
        
        partida = Partida(
            activa = True,
            usuario_solicitante = invitacion.usuario_solicitante,
            usuario_destinatario = invitacion.usuario_destinatario,
            color_usuario_solicitante = color_usuario_solicitante,
            color_usuario_destinatario = color_usuario_destinatario,
        )
        partida.save()
        return JsonResponse({'idPartida': partida.id}, safe=False)
    
    
    def crear_invitacion_a_partida(self, request):
        datos = json.loads(request.body)
        usuario_solicitante = request.user
        usuario_solicitante = PerfilUsuario.objects.get(usuario=usuario_solicitante)
        
        nombre_usuario_destinatario = datos['nombreOponente']
        usuario_destinatario = User.objects.get(username=nombre_usuario_destinatario)
        usuario_destinatario = PerfilUsuario.objects.get(usuario=usuario_destinatario)
        
        invitacion = Invitacion.objects.create(
            aceptada = False,
            esAmigo = False,
            usuario_solicitante = usuario_solicitante,
            usuario_destinatario = usuario_destinatario,
        )
        invitacion.save()
        print("Invitacion guardada en DB.")
        return render(request, "index.html")
    

    def buscar_partida(self, request):
        return render(request, "invitarAPartida.html")
    
    
    def mostrar_invitaciones_pendientes(self, request):
        usuario = request.user
        id_usuario = usuario.id
        invitaciones_pendientes = Invitacion.objects.filter(usuario_destinatario_id=id_usuario, aceptada=False)
        contexto = { "invitacionesPendientes" : invitaciones_pendientes }
        
        return render(request, "invitacionesPendientes.html", contexto)
    
    
    def aceptar_invitacion(self, request):
        if request.method == "POST":
            datos = json.loads(request.body)
            id_invitacion = datos['idInvitacion']
            invitacion = Invitacion.objects.get(id=id_invitacion)
            invitacion.aceptada = True
            invitacion.save()
            print("invitacion: ", invitacion)

        return JsonResponse({"idInvitacion" : id_invitacion})