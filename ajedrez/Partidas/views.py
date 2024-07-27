from django.shortcuts import render
from django.http import JsonResponse
from .models import Partida, Invitacion
from Usuarios.models import PerfilUsuario, User
import json

class PartidasController(): 
    def partida(self, request, id):
        partida = Partida.objects.get(id=id)
        usuario_actual = request.user
        perfil_usuario_solicitante = partida.usuario_solicitante
        perfil_usuario_destinatario = partida.usuario_destinatario
        usuario_solicitante = perfil_usuario_solicitante.usuario
        usuario_destinatario = perfil_usuario_destinatario.usuario
        
        if usuario_solicitante == usuario_actual:
            rol_usuario = 'solicitante'
            rol_oponente = 'destinatario'
        elif usuario_destinatario == usuario_actual:
            rol_usuario = 'destinatario'
            rol_oponente = 'solicitante'

        
        contexto = {
            "id": id,
            'nombre_usuario_actual': usuario_actual.username,
            "rol_usuario": rol_usuario,
            "rol_oponente": rol_oponente,
        }

        return render(request, 'partida.html', contexto)
    
    
    def crear_partida(self, request):
        datos = json.loads(request.body)
        id_invitacion = datos['idInvitacion']
        invitacion = Invitacion.objects.get(id=id_invitacion)
        
        partida = Partida(
            activa = True,
            usuario_solicitante = invitacion.usuario_solicitante,
            usuario_destinatario = invitacion.usuario_destinatario,
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