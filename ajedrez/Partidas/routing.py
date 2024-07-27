from django.urls import re_path
from .consumers import PartidasConsumer

websocket_urlpatterns_partidas = [
    re_path(r'ws/partidas/partida_(?P<id>[-\w]+)/$', PartidasConsumer.as_asgi()),
]