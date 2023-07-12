from django.urls import path
from . import views

urlpatterns = [
    path('',views.cargarInicio, name='inicio'),
    path('productos/',views.productos, name='productos'),
    path('carrito/',views.carrito, name='carrito'),
    path('cuidados/',views.cuidados, name='cuidados'),
    path('login/',views.login, name='login'),
    path('registro/',views.registro, name='registro'),
    path('veterinaria/',views.veterinaria, name='veterinaria'),
    path('agregarProducto/',views.cargarAgregarProducto, name='agregarProducto'),
    path('agregarProductoForm',views.agregarProducto),
    path('editarProducto/<sku>',views.cargarEditarProducto, name='editarProducto'),
    path('editarProductoForm/',views.editarProducto),
    path('eliminarProducto/<sku>',views.eliminarProducto)
]

