from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from userauth.models import User, Profile
from api import serializer as api_serializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .models import Tutoria
from .serializer import TutoriaSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializer.MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = api_serializer.RegisterSerializer


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
