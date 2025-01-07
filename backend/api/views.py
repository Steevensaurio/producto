from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from userauth.models import User
from api import serializer as api_serializer
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from .models import Tutoria, Curso, Representante, Tutor, opcionParalelo, opcionCurso, Matriculas, opcionTitulos
from .serializer import TutoriaSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializer.MyTokenObtainPairSerializer



class SolicitudTutoriaView(generics.CreateAPIView):
    queryset = Tutoria.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TutoriaSerializer

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)


class TutoriaListView(APIView):
    permission_classes = [
        IsAuthenticated
    ]  # Asegúrate de que solo los usuarios autenticados puedan acceder

    def get(self, request):
        tutorias = Tutoria.objects.all()  # Obtiene todas las tutorías
        serializer = TutoriaSerializer(tutorias, many=True)
        return Response(serializer.data)
    
    
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
    serializer_class = api_serializer.TutoriaSerializer
    
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

#Vista para matriculas

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