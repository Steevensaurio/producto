from django.db import models
from userauth.models import User

  
class Representante(models.Model):
    
    NIVEL_ESTUDIOS_OPCIONES = [
        ('SIN', 'Sin educación formal'),
        ('PRI', 'Primaria incompleta'),
        ('PRI_C', 'Primaria completa'),
        ('SEC', 'Secundaria incompleta'),
        ('SEC_C', 'Secundaria completa'),
        ('TEC', 'Técnico o tecnólogo'),
        ('UNI', 'Universidad incompleta'),
        ('UNI_C', 'Universidad completa'),
        ('POS', 'Posgrado (Maestría o Doctorado)'),
        ('OTR', 'Otro'),
    ]
    
    id_user_FK = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='representantes_usuarios')
    
    parentesco = models.CharField(max_length=100, blank=True, null=True)
    ocupacion = models.CharField(max_length=100, blank=True, null=True)
    nivel_estudios = models.CharField(
        max_length=10,
        choices=NIVEL_ESTUDIOS_OPCIONES,
        default='SIN',
    )
    telefono_auxiliar = models.CharField(max_length=10, blank=True, null=True)
    
    def __str__(self):
        return self.id_user_FK.get_full_name()
    
    class Meta:
        db_table='representante'
        verbose_name = 'Representante'
        verbose_name_plural = 'Representante'
        
    

class Tutor(models.Model):
    
    TITULOS=[
        ('TEC', 'Técnico Superior'),
        ('LIC', 'Licenciatura'),
        ('ING', 'Ingeniería'),
        ('MSC', 'Maestría'),
        ('PHD', 'PhD'),
    ]
    
    nivel_estudios = models.CharField(max_length=100, choices=TITULOS, default='Lic')
    especializacion = models.CharField(max_length=100, verbose_name="Especialización", blank=True, null=True)
    años_experiencia = models.PositiveIntegerField(verbose_name="Años de Experiencia", blank=True, null=True)
    certificaciones = models.TextField(null=True, blank=True, verbose_name="Certificaciones")
    
    id_user_FK = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='tutores_usuarios')
    
    def __str__(self):
        return f'{self.nivel_estudios}. {self.id_user_FK.get_full_name()}'
    
    class Meta:
        db_table='tutor'
        verbose_name = 'Tutor'
        verbose_name_plural = 'Tutores' 
    
        

class Estudiante(models.Model):
    
    ESTADO_OPCIONES = [
        ('AC', 'Activo'),
        ('IN', 'Inactivo'),
        ('GR', 'Graduado'),
        ('SU', 'Suspendido'),
    ]

    
    estado_academico = models.CharField(
        max_length=2,
        choices=ESTADO_OPCIONES,
        default='AC',
        verbose_name="Estado Academico"
    )
    observaciones = models.TextField(null=True, blank=True, verbose_name="Observaciones")
    
    
    id_user_FK = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='estudiantes_usuarios')
    id_representante_FK = models.ForeignKey(Representante, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.id_user_FK.get_full_name()
    
    class Meta:
        db_table='estudiantes'
        verbose_name = 'Estudiantes'
        verbose_name_plural = 'Estudiantes' 
        

class Asignaturas(models.Model):
    asignatura = models.CharField(unique=True, max_length=100, blank=True, null=True)
    codigo = models.CharField(unique=True, max_length=10, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    creditos = models.IntegerField(blank=True, null=True)
    estado = models.CharField(max_length=10, choices=[('Activo', 'Activo'), ('Inactivo', 'Inactivo')], default='Activo')
    
    def __str__(self):
        return self.asignatura
    
    class Meta:
        db_table='asignaturas'
        verbose_name = 'Asignatura'
        verbose_name_plural = 'Asignaturas' 
    
    
class CargaDocente(models.Model):
    id_tutor_FK = models.ForeignKey(Tutor, on_delete=models.SET_NULL, null=True)
    id_asignatura_FK = models.ForeignKey(Asignaturas, on_delete=models.SET_NULL, null=True)
    
    periodo = models.CharField(max_length=20, verbose_name="Período")
    horas = models.PositiveIntegerField(default=0, verbose_name="Horas Asignadas")
    
    def __str__(self):
        return f'{self.id_asignatura_FK.asignatura} -{self.periodo} - {self.id_tutor_FK.id_user_FK.get_full_name()}'
    
    class Meta:
        db_table='carga-docente'
        verbose_name = 'Carga Docente'
        verbose_name_plural = 'Cargas Docente' 
        

class Curso(models.Model):
    curso = models.CharField(max_length=100)
    paralelo = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.curso}  "{self.paralelo}"'  
    
    class Meta:
        db_table='curso'
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'   
        
        
class PlanEstudios(models.Model):
    id_curso_FK = models.ForeignKey(Curso, on_delete=models.SET_NULL, null=True)    
    id_asignatura_FK = models.ForeignKey(Asignaturas, on_delete=models.SET_NULL, null=True)
    
    class Meta:
        db_table='plan-estudios'
        verbose_name = 'Plan de Estudio'
        verbose_name_plural = 'Plan de Estudios' 
        

class Matriculas(models.Model):
    id_estudiante_FK = models.ForeignKey(Estudiante, on_delete=models.SET_NULL, null=True, blank=True) 
    id_curso_FK = models.ForeignKey(Curso, on_delete=models.SET_NULL, null=True, blank=True) 

    jornada = models.CharField(max_length=10, choices=[('Matutina', 'Matutina'), ('Vespertina', 'Vespertina')], default='Matutina')
    fecha_matricula = models.DateField(auto_now_add=True)
    año_lectivo = models.CharField(max_length=10, blank=True, null=True)
    
    class Meta:
        db_table='matriculas'
        verbose_name = 'Matricula'
        verbose_name_plural = 'Matriculas'
        
   
class Tutoria(models.Model):
    
    tema = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    modalidad = models.CharField(max_length=100, choices=[('Presencial', 'Presencial'), ('Virtual', 'Virtual')])
    seccion = models.CharField(max_length=10, choices=[('Matutina', 'Matutina'), ('Vespertina', 'Vespertina')], default='Matutina')
    fecha = models.DateField()
    tipo = models.CharField(
        max_length=10,
        choices=[
            ('Grupal', 'Grupal'),
            ('Individual', 'Individual'),
        ],
        null=True,
        blank=True
    )
    
    estado = models.CharField(
        max_length=20,
        choices=[
            ('Programada', 'Programada'),
            ('En curso', 'En curso'),
            ('Finalizada', 'Finalizada'),
            ('Cancelada', 'Cancelada'),
            ('Reprogramada', 'Reprogramada'),
            ('Pendiente', 'Pendiente'),
        ],
        null=True,
        blank=True
    )
    
    id_tutor_FK = models.ForeignKey(Tutor, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.tema
    
    class Meta: 
        db_table='tutoria'
        verbose_name = 'Tutoria'
        verbose_name_plural = 'Tutorias'
        
        
class InscripcionTutoria(models.Model):
    ESTADO_INSCRIPCION_CHOICES = [
        ('Inscrito', 'Inscrito'),
        ('Pendiente', 'Pendiente'),
        ('Cancelado', 'Cancelado'),
        ('Finalizado', 'Finalizado'),
        ('Rechazado', 'Rechazado'),
    ]
    
    fecha_inscripcion = models.DateField(auto_now_add=True)
    estado_inscripcion = models.CharField(max_length=10, choices=ESTADO_INSCRIPCION_CHOICES, default='Pendiente')
    asistencia = models.BooleanField(default=False)

    id_estudiante_FK = models.ForeignKey(Estudiante, on_delete=models.SET_NULL, null=True, blank=True)
    id_tutoria_FK = models.ForeignKey(Tutoria, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return f'{self.id_estudiante_FK.id_user_FK.get_full_name()} --> {self.id_tutoria_FK.tema}'

    class Meta: 
        db_table='inscripcion-tutoria'
        verbose_name = 'Inscripcion a Tutoria'
        verbose_name_plural = 'Inscripciones a Tutorias'
    
    
    
 
class opcionTitulos(models.Model):
    codigo = models.CharField(max_length=3)
    titulo = models.CharField() 
    
    def __str__(self):
        return self.titulo 
    
    class Meta: 
        db_table='opcion-titulos'
        verbose_name = 'Opcion Titulo'
        verbose_name_plural = 'Opcion Titulos'
    
class opcionCurso(models.Model):
    cursos = models.CharField(max_length=100)
    
    def __str__(self):
        return self.cursos
    
class opcionParalelo(models.Model):
    paralelos = models.CharField(max_length=1)
    
    def __str__(self):
        return self.paralelos