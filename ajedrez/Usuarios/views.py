import json
from django.shortcuts import render
from django.contrib.auth import login, logout
from django.http import JsonResponse
from .forms import FomularioDeCreacionDeUsuario, FomularioDeAutenticacionDeUsuario
from .models import User

class UsuariosController():

    def registrar_usuario(self, request):
        if request.method == 'POST':
            formulario = FomularioDeCreacionDeUsuario(request.POST)
            if formulario.is_valid():
                print('USUARIO VALIDO')
                usuario = formulario.save()
                login(request, usuario)
            else:
                print('USUARIO INVALIDO')
            return render(request, 'index.html')

        else:
            formulario = FomularioDeCreacionDeUsuario()
            return render(request, 'registrarUsuario.html', {'formulario':formulario})


    def logear_usuario(self, request):
        if request.method == 'POST':
            datos = json.loads(request.body)
            nombre_usuario = datos['nombreUsuario']
            usuario = User.objects.get(username=nombre_usuario)
            if usuario.password == datos['password']:
                login(request, usuario)                
            return render(request, 'index.html')
        
        else:
            formulario = FomularioDeAutenticacionDeUsuario()
        return render(request, 'loginUsuario.html', {'formulario':formulario})
    
    
    def deslogear_usuario(self, request):
        if request.method == 'GET':
            logout(request)
        return render(request, "index.html")


    def buscar_nombres_de_usuario(self, request):
        if request.method == "GET":
            busqueda = request.GET.get('busqueda', '')

            if busqueda:
                nombres = User.objects.filter(username__istartswith=busqueda).values_list("username", flat=True)
                print(f"busqueda: .{busqueda}.")
            else:
                nombres = User.objects.all().values_list("username", flat=True)

        print("nombres encontrados:", nombres)

        return JsonResponse(list(nombres), safe=False)