from django.shortcuts import render, redirect
from .models import *
import os
from django.conf import settings
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_protect
from .forms import CustomUserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib import messages


# Create your views here.
def cargarInicio(request):
    return render(request,"inicio.html")


def productos(request):
    return render(request, 'productos.html')

def carrito(request):
    return render(request, 'carrito.html')

def cuidados(request):
    return render(request, 'cuidados.html')





def veterinaria(request):
    return render(request, 'veterinaria.html')



""" de aqui abajo todo es nuevo """


def cargarInicio(request):
    productos = Producto.objects.all()
    categoria_perros = Producto.objects.filter(id_categoria = 1)
    categoria_gatos = Producto.objects.filter(id_categoria = 2)
    return render(request,"inicio.html",{"prod":productos,"cate_gatos":categoria_gatos,"cate_perros":categoria_perros})
    


def cargarAgregarProducto(request):
    categorias = Categoria.objects.all()
    productos = Producto.objects.all()
    return render(request,"agregarProducto.html",{"cate":categorias, "prod":productos})


def agregarProducto(request):
    #print("PRODUCTO AGREGAR", request.POST)

    v_sku = request.POST['txtSku']
    v_nombre = request.POST['txtNombre']
    v_stock = request.POST['txtStock']
    v_precio = request.POST['txtPrecio']
    v_descripcion = request.POST['txtDescripcion']
    v_img = request.FILES['txtImg']
    v_categoria = Categoria.objects.get(id_categoria = request.POST['cmbCategoria'])

    Producto.objects.create(sku = v_sku,nombre = v_nombre,stock = v_stock,precio = v_precio,descripcion = v_descripcion, id_categoria = v_categoria, imagen_url = v_img)        

    return redirect('/agregarProducto')



def cargarEditarProducto(request,sku):
    productos = Producto.objects.get(sku = sku)
    categorias = Categoria.objects.all()
    return render(request,"editarProducto.html",{"prod":productos,"cate":categorias})

def editarProducto(request):
    v_sku = request.POST['txtSku']
    productoBD = Producto.objects.get(sku = v_sku)
    v_nombre = request.POST['txtNombre']
    v_stock = request.POST['txtStock']
    v_precio = request.POST['txtPrecio']
    v_descripcion = request.POST['txtDescripcion']
    v_categoria = Categoria.objects.get(id_categoria = request.POST['cmbCategoria'])

    try:
        v_img = request.FILES['txtImg']
        ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(productoBD.imagen_url))
        os.remove(ruta_imagen)
    except:
        v_img = productoBD.imagen_url


    productoBD.nombre = v_nombre
    productoBD.stock = v_stock
    productoBD.precio = v_precio
    productoBD.descripcion = v_descripcion
    productoBD.imagen_url = v_img
    productoBD.id_categoria = v_categoria

    productoBD.save()


    return redirect('/agregarProducto')


def eliminarProducto(request,sku):
    producto = Producto.objects.get(sku = sku)
    ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(producto.imagen_url))
    os.remove(ruta_imagen)
    producto.delete()
    return redirect('/agregarProducto')


def registro(request):
    data = {
        'form': CustomUserCreationForm()
    }

    if request.method == 'POST':
        formulario = CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            user = authenticate(username=formulario.cleaned_data["username"], password=formulario.cleaned_data["password1"])
            login(request, user)
            messages.success(request, "Registro completado con exito")
            #redirigir al inicio
            return redirect(to="inicio")
        data["form"] = formulario

    return render(request, 'registration/registro.html', data)
