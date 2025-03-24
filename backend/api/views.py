from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from userauth.models import User
from api import serializer as api_serializer
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from .models import Tutoria, Curso, Representante,Solicitud, InscripcionTutoria, Estudiante, Tutor, opcionParalelo, opcionCurso, Matriculas, opcionTitulos, Asignaturas, opcionNivelEstudios, CargaDocente
from .serializer import TutoriaSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializer.MyTokenObtainPairSerializer



class SolicitudTutoriaView(generics.CreateAPIView):
    queryset = Tutoria.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TutoriaSerializer

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)


# -------------------------------------------------------------------------- #
    

class CursoView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.CursoSerializer
    
    def create(self, request, *args, **kwargs):
        curso = request.data.get('curso')
        paralelo = request.data.get('paralelo')
        if Curso.objects.filter(curso=curso, paralelo=paralelo).exists():
            return Response({'error': 'El curso con este paralelo ya existe'}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)
    
    
class CursoListView(generics.ListAPIView):
    queryset = Curso.objects.all()
    serializer_class = api_serializer.CursoSerializer
    
    
    
#_ ____________________________________________-

class RegistroUsuarioTutorView(generics.CreateAPIView):
    serializer_class = api_serializer.RegistroUsuarioTutorSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Esto lanzará un error 400 si no es válido
        self.perform_create(serializer)  # Guarda el nuevo usuario y tutor
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RegistroUsuarioRepresentanteView(generics.CreateAPIView):
    serializer_class = api_serializer.RegistroUsuarioRepresentanteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Esto lanzará un error 400 si no es válido
        self.perform_create(serializer)  # Guarda el nuevo usuario y tutor
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class RegistroUsuarioEstudianteView(generics.CreateAPIView):
    serializer_class = api_serializer.RegistroUsuarioEstudianteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"detail": "Estudiante registrado exitosamente."},
                status=status.HTTP_201_CREATED
            )
        else:
            # Aquí se envían los errores del serializer directamente
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class AsignarTutoriaView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.TutoriaAsignarSerializer

class SolicitudTutoriaView(generics.CreateAPIView):
    queryset = Solicitud.objects.all()
    serializer_class = api_serializer.TutoriaSolicitudSerializer
    permission_classes = [AllowAny]  # Solo usuarios autenticados pueden crear solicitudes

    def perform_create(self, serializer):
        serializer.save(id_user_FK=self.request.user) 

class SolicitudTutoriaListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Solicitud.objects.all()
    serializer_class = api_serializer.TutoriaSolicitudSerializer
    
class TutoriasListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Tutoria.objects.all()
    serializer_class = api_serializer.TutoriaSerializer
    
#######################################################    
###  Vistas para listar las opciones de los cursos  ###
#######################################################

class OpcionesCursosListView(generics.ListAPIView):
    queryset = opcionCurso.objects.all()
    serializer_class = api_serializer.OpcionCursoSerializer
    
class OpcionesParalelosListView(generics.ListAPIView):
    queryset = opcionParalelo.objects.all()
    serializer_class = api_serializer.OpcionParaleloSerializer
    
    
########################################################    
###  Vistas para listar las opciones de los titulos  ###
########################################################

class OpcionesTitulosListView(generics.ListAPIView):
    queryset = opcionTitulos.objects.all()
    serializer_class = api_serializer.OpcionTitulosSerializer
    
########################################################    
###  Vistas para listar las opciones de los niveles  ###
########################################################

class OpcionesNivelesListView(generics.ListAPIView):
    queryset = opcionNivelEstudios.objects.all()
    serializer_class = api_serializer.OpcionNivelEstudiosSerializer
    
#################################
### Vistas de  de Asignaturas ###
#################################

class AsignaturaView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.AsignaturaSerializer
    queryset = Asignaturas.objects.all()
    

class AsignaturaListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Asignaturas.objects.all()
    serializer_class = api_serializer.AsignaturaSerializer
    
########################################   
###  Vistas para listar las tutores  ###
########################################
 
class TutoresListView(generics.ListAPIView):
    queryset = Tutor.objects.all()
    serializer_class = api_serializer.TutorListSerializer
    
    
##############################################   
###  Vistas para listar las representante  ###
##############################################

class RepresentantesListView(generics.ListAPIView):
    queryset = Representante.objects.all()
    serializer_class = api_serializer.RepresentanteListSerializer  
    
############################################   
###  Vistas para listar las estudiantes  ###
############################################

class EstudiantesListView(generics.ListAPIView):
    queryset = Estudiante.objects.all()
    serializer_class = api_serializer.EstudianteListSerializer   


#Vista para Crear matriculas

class MatriculaView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Matriculas.objects.all()
    serializer_class = api_serializer.MatriculaSerializer
    
    def create(self, request, *args, **kwargs):
        try:
            # Llamamos al método create de la clase base para manejar la creación del objeto
            response = super().create(request, *args, **kwargs)
            return Response({'success': True, 'message': 'Estudiante matriculado exitosamente.'}, status=status.HTTP_201_CREATED)
        
        except ValidationError as e:
            # Extraemos los mensajes de error del ValidationError
            error_messages = []
            if isinstance(e.detail, dict):  # Si es un diccionario de errores
                for field, messages in e.detail.items():
                    error_messages.extend(messages)
            elif isinstance(e.detail, list):  # Si es una lista de errores
                error_messages.extend(e.detail)
            else:  # Otros casos
                error_messages.append(str(e))

            # Enviamos solo los mensajes
            return Response(
                {'success': False, 'message': ' '.join(error_messages)},
                status=status.HTTP_400_BAD_REQUEST
            )
            
            
class MatriculaListView(generics.ListAPIView):
    serializer_class = api_serializer.MatriculasListSerializer

    def get_queryset(self):
        curso_id = self.request.query_params.get('curso', None) 
        seccion = self.request.query_params.get('seccion', None) 
        año_lectivo = self.request.query_params.get('año_lectivo', None) 

        queryset = Matriculas.objects.all()

        if curso_id:
            queryset = queryset.filter(id_curso_FK=curso_id)

        if seccion:
            queryset = queryset.filter(jornada=seccion)

        if año_lectivo:
            queryset = queryset.filter(año_lectivo=año_lectivo)
            
        return queryset
    
    
############################################   
###  Vistas para Incripciones a tutoria  ###
############################################

class InscripcionesView (generics.CreateAPIView):
    queryset = InscripcionTutoria.objects.all()
    serializer_class = api_serializer.InscripcionSerializer
    
    

class AniosLectivosListView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        # Obtener años lectivos únicos
        años_lectivos = Matriculas.objects.values_list('año_lectivo', flat=True).distinct()
        return JsonResponse(list(años_lectivos), safe=False)


class AsignarCargaDocenteView(generics.CreateAPIView):
    serializer_class = api_serializer.CargaDocenteSerializer
    queryset = CargaDocente.objects.all()




class ObtenerIdTutorView(APIView):
    permission_classes = [IsAuthenticated]  # 🔒 Requiere autenticación

    def get(self, request):
        print("🛠 Cabecera de autorización recibida:", request.headers.get("Authorization"))
        print("🛠 Usuario autenticado:", request.user)

        if not request.user.is_authenticated:
            return Response({"error": "Usuario no autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            tutor = Tutor.objects.get(id_user_FK=request.user)
            return Response({"tutor_id": tutor.id}, status=status.HTTP_200_OK)
        except Tutor.DoesNotExist:
            return Response({"tutor_id": None}, status=status.HTTP_200_OK)


class ObtenerIdEstudianteView(APIView):
    permission_classes = [IsAuthenticated]  # 🔒 Requiere autenticación

    def get(self, request):
        print("🛠 Cabecera de autorización recibida:", request.headers.get("Authorization"))
        print("🛠 Usuario autenticado:", request.user)

        if not request.user.is_authenticated:
            return Response({"error": "Usuario no autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            estudiante = Estudiante.objects.get(id_user_FK=request.user)
            return Response({"estudiante_id": estudiante.id}, status=status.HTTP_200_OK)
        except Estudiante.DoesNotExist:
            return Response({"estudiante_id": None}, status=status.HTTP_200_OK)  