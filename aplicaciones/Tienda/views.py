from django.shortcuts import render, redirect



# Create your views here.
def cargarInicio(request):
    return render(request,"inicio.html")


def productos(request):
    return render(request, 'productos.html')

def carrito(request):
    return render(request, 'carrito.html')

def cuidados(request):
    return render(request, 'cuidados.html')


def login(request):
    return render(request, 'login.html')


def registro(request):
    return render(request, 'registro.html')


def veterinaria(request):
    return render(request, 'veterinaria.html')



""" de aqui abajo todo es nuevo """

