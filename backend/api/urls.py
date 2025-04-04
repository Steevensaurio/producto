from api import views as api_views
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("user/token/", api_views.MyTokenObtainPairView.as_view()),
    path("user/token/refresh/", TokenRefreshView.as_view()),
    
    #Matriculas
    path("matricula/", api_views.MatriculaView.as_view(), name="matricular-estudiante"),
    path("matricula/listado/", api_views.MatriculaListView.as_view(), name="matricular-estudiante"),
    
    #Estudiantes
    path("estudiante/registrar/", api_views.RegistroUsuarioEstudianteView.as_view(), name="registrar-estudiante"),
    path("estudiante/listado/", api_views.EstudiantesListView.as_view(), name="listado-estudiantes"),
    
    #Cursos
    path("curso/crear/", api_views.CursoView.as_view()),
    path("curso/listado/", api_views.CursoListView.as_view()),
    
    #Asignatura
    path("asignatura/crear/", api_views.AsignaturaView.as_view()),
    path("asignatura/listado/", api_views.AsignaturaListView.as_view()),
    
    #Tutores
    path("tutor/registrar/", api_views.RegistroUsuarioTutorView.as_view(), name="registrar-tutor"),
    # path("tutor/editar/", api_views.TutorView.as_view()),
    path("tutor/listado/", api_views.TutoresListView.as_view()),
    path("tutor/carga-horaria/", api_views.AsignarCargaDocenteView.as_view()),
    
    
    #Representantes
    path("representante/registrar/", api_views.RegistroUsuarioRepresentanteView.as_view(), name="registrar-representante"),
    # path("representante/editar/", api_views.RepresentanteView.as_view()),
    path("representante/listado/", api_views.RepresentantesListView.as_view()),
    
    #Tutorias    
    path("tutoria/asignar/", api_views.AsignarTutoriaView.as_view()),
    path("tutoria/solicitud/", api_views.SolicitudTutoriaView.as_view()),
    path("tutoria/solicitud/listado/", api_views.SolicitudTutoriaListView.as_view()),
    path("tutoria/listado/", api_views.TutoriasListView.as_view()),
    path("tutoria/inscripciones/", api_views.InscripcionesView.as_view()),
    path("tutoria/inscripciones/listado/", api_views.InscripcionesListView.as_view()),
    
    
    #OTROS
    path("cursos/", api_views.OpcionesCursosListView.as_view(), name="cursos-list"),
    path("paralelos/", api_views.OpcionesParalelosListView.as_view(), name="paralelos-list"),
    path("titulos/", api_views.OpcionesTitulosListView.as_view(), name="titulos-list"),
    path("niveles/", api_views.OpcionesNivelesListView.as_view(), name="titulos-list"),
    path("periodos/", api_views.AniosLectivosListView.as_view(), name="peripdo-list"),
    path('tutor-id/', api_views.ObtenerIdTutorView.as_view(), name='tutor-id'),
    path('estudiante-id/', api_views.ObtenerIdEstudianteView.as_view(), name='tutor-id'),
    path("solicitud/<int:id>/actualizar-estado/", api_views.ActualizarEstadoSolicitud.as_view(), name="actualizar-estado"),
    
    
    
]
