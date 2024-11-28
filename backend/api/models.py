from django.db import models
from userauth.models import User


class Tutoria(models.Model):
    tema = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    modalidad = models.CharField(max_length=100)
    seccion = models.CharField(max_length=100)
    fecha = models.DateField()
    comentario = models.CharField(max_length=100)
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    
class Curso(models.Model):
    pass
