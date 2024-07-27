from django.urls import re_path
from .views import PartidasController

app_name = "Partidas"

urlpatterns = [
    re_path(r'^crear_partida/$', PartidasController().crear_partida, name='crear_partida'),
    re_path(r'^partida_(?P<id>[-\w]+)/$', PartidasController().partida, name='partida'),
    re_path(r'^buscar_partida/$', PartidasController().buscar_partida, name='buscar_partida'),
    re_path(r'^crear_invitacion_a_partida/$', PartidasController().crear_invitacion_a_partida, name='crear_invitacion_a_partida'),
    re_path(r'^invitaciones_pendientes/$', PartidasController().mostrar_invitaciones_pendientes, name='invitaciones_pendientes'),
    re_path(r'^aceptar_invitacion/$', PartidasController().aceptar_invitacion, name='aceptar_invitacion'),
]