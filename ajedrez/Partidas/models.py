from django.db import models
from Usuarios.models import PerfilUsuario

class Partida(models.Model):
    activa = models.BooleanField()
    duracion = models.IntegerField(default=600)
    tiempo_agregado_por_jugada = models.IntegerField(default=3)

    usuario_solicitante = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, related_name="partidas_solicitadas")
    usuario_destinatario = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, related_name="partidas_recibidas")

    usuario_ganador = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, null=True, related_name="partidas_ganadas")
    usuario_perdedor = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, null=True, related_name="partidas_perdidas")
    
    color_usuario_solicitante = models.CharField(max_length=50)
    color_usuario_destinatario = models.CharField(max_length=50)


class Invitacion(models.Model):
    aceptada = models.BooleanField()
    esAmigo = models.BooleanField(default=False)
    usuario_solicitante = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, related_name="invitaciones_solicitadas")
    usuario_destinatario = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, related_name="invitaciones_recibidas")


    def __str__(self) -> str:
        estado = "aceptada" if self.aceptada else "pendiente"
        return f"Invitacion de {self.usuario_solicitante.usuario.username.upper()} en estado '{estado.upper()}'."
