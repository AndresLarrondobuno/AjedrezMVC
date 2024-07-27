from django.urls import re_path
from .views import UsuariosController

app_name = 'Usuarios'

urlpatterns = [
    re_path(r'^registrate/$', UsuariosController().registrar_usuario, name='registrar_usuario'),
    re_path(r'^login/$', UsuariosController().logear_usuario, name='logear_usuario'),
    re_path(r'^logout/$', UsuariosController().deslogear_usuario, name='deslogear_usuario'),
    re_path(r'^buscar_nombres_de_usuario/$', UsuariosController().buscar_nombres_de_usuario, name='buscar_nombres_de_usuario'),
]