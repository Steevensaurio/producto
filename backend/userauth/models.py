from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

class Perfiles(models.Model):
    perfil = models.CharField(max_length=250, blank=True, null=True)
    descripcion = models.CharField(max_length=250, blank=True, null=True)
    
    def __str__(self):
        return self.perfil
    
    class Meta:
        db_table='perfiles'
        verbose_name = 'Perfiles'
        verbose_name_plural = 'Perfiles'


class User(AbstractUser):
    username = models.CharField(unique=True, max_length=100)
    email = models.EmailField(unique=True)
    full_name = models.CharField(unique=True, max_length=300)
    estado = models.CharField(max_length=10, choices=[('Activo', 'Activo'), ('Inactivo', 'Inactivo')], default='Activo')
    cedula = models.CharField(unique=True, max_length=10, blank=True, null=True)
    genero = models.CharField(max_length=10, choices=[('Masculino', 'Masculino'), ('Femenino', 'Femenino')])
    fecha_nacimiento = models.DateField(null=True, blank=True)
    telefono = models.CharField(max_length=10, blank=True, null=True)
    id_perfil_FK = models.ForeignKey(Perfiles, on_delete=models.SET_NULL, null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.full_name
    
    class Meta:
        db_table='usuarios'
        verbose_name = 'Usuarios'
        verbose_name_plural = 'Usuarios'

    def save(self, *args, **kwargs):
        email_username, _ = self.email.split("@")
        if self.full_name == "" or self.full_name == None:
            self.full_name = email_username
        if self.username == "" or self.username == None:
            self.username = email_username

        super(User, self).save(*args, **kwargs)
        
            


