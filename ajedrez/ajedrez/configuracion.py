def agregar_proyecto_a_sistema_de_rutas_python():
    import sys
    sys.path.append(r'C:\programacion\AjedrezMVC\Ajedrez')

def cargar_settings():
    import django, os
    os.environ['DJANGO_SETTINGS_MODULE'] = 'ajedrez.settings'
    django.setup()