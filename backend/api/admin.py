from django.contrib import admin
from .models import Tutoria, Estudiante,Curso, Representante, Tutor, opcionCurso, opcionParalelo, Matriculas, opcionTitulos

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name','date']

admin.site.register(Tutoria)
admin.site.register(Curso)
admin.site.register(Tutor)
admin.site.register(Representante)
admin.site.register(Estudiante)
admin.site.register(Matriculas)
admin.site.register(opcionTitulos)
admin.site.register(opcionCurso)
admin.site.register(opcionParalelo)
