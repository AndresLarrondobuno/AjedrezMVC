import sys, django, os
sys.path.append(r'C:\programacion\AjedrezMVC\Ajedrez')
 
os.environ['DJANGO_SETTINGS_MODULE'] = 'ajedrez.settings'
django.setup()
    
import shutil, subprocess
from django.contrib.auth import login
from Usuarios.models import User, PerfilUsuario


def insertar_usuarios_para_testing():
    usuario_andresporteus = User(
        username='andresporteus',
        password='caradepapa'
    )
    usuario_andresporteus.save()
    perfil_andresporteus = PerfilUsuario(usuario=usuario_andresporteus)
    perfil_andresporteus.save()
    
    usuario_monogod = User(
        username='monogod',
        password='caradepapa'
    )
    usuario_monogod.save()
    perfil_monogod = PerfilUsuario(usuario=usuario_monogod)
    perfil_monogod.save()


directorioInserciones = os.getcwd()
directorioAppPrincipal = os.path.dirname(directorioInserciones)

rutasASubdirectorios = [os.path.join(directorioAppPrincipal, directorio) for directorio in os.listdir(directorioAppPrincipal)]
subdirectorios = [os.listdir(ruta) for ruta in rutasASubdirectorios if os.path.isdir(ruta)]

walk = [(root,dirs,files) for root,dirs,files in os.walk(directorioAppPrincipal)]

for root,dirs,files in walk:
    for dir in dirs:
        if "migrations" in dir:
            path = os.path.join(root,dir)
            shutil.rmtree(path)
            print(f"ruta de archivo eliminado: {path}")
            print()


rutaABaseDeDatos = r"C:\programacion\AjedrezMVC\ajedrez\db.sqlite3"

if os.path.exists(rutaABaseDeDatos):
    os.remove(rutaABaseDeDatos)

comandoMakemigrations = ["py", "manage.py", "makemigrations"]

comandoMakeMigrationsUsuariosApp = ["py", "manage.py", "makemigrations", 'Usuarios']

comandoMakeMigrationsPartidasApp = ["py", "manage.py", "makemigrations", 'Partidas']

comandoMigrate = ["py", "manage.py", "migrate"]

comandoMigrateUsuariosApp = ["py", "manage.py", "migrate", 'Usuarios']

comandoMigratePartidasApp = ["py", "manage.py", "migrate", 'Partidas']


os.chdir(directorioAppPrincipal)

subprocess.run(comandoMakemigrations, cwd=directorioAppPrincipal)
subprocess.run(comandoMakeMigrationsUsuariosApp, cwd=directorioAppPrincipal)
subprocess.run(comandoMakeMigrationsPartidasApp, cwd=directorioAppPrincipal)

subprocess.run(comandoMigrate, cwd=directorioAppPrincipal)
subprocess.run(comandoMigrateUsuariosApp, cwd=directorioAppPrincipal)
subprocess.run(comandoMigratePartidasApp, cwd=directorioAppPrincipal)

insertar_usuarios_para_testing()