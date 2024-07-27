from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import inicio


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^$', inicio, name='inicio'),
    re_path(r'^usuarios/', include('Usuarios.urls')),
    re_path(r'^partidas/', include('Partidas.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)