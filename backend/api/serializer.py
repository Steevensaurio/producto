from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from userauth.models import  User, Perfiles
from api import models as api_models
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response


from django.db import transaction, IntegrityError

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["full_name"] = user.full_name
        token["email"] = user.email
        token["username"] = user.username
        token["cedula"] = user.cedula
        token["perfil"] = user.id_perfil_FK

        return token

#################################
###  Serializador de Usuario  ###
#################################

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 'email', 'full_name', 'estado', 'cedula', 
            'genero', 'fecha_nacimiento', 'telefono', 'id_perfil_FK'
        ] 

#############################################  
###  Serializador de Registro de Usuario  ###
#############################################  
 
class RegistroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    id_perfil_FK = serializers.PrimaryKeyRelatedField(queryset=Perfiles.objects.all())
    
    class Meta:
        model = User
        fields = ['full_name', 'email', 'password', 'password2', 'estado', 'cedula', 'genero','fecha_nacimiento','telefono' ,'id_perfil_FK']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return attrs
    

    
#############################################  
### Modulo de Creación de Usuario y Tutor ###
#############################################  
    

class RegistroTutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Tutor
        fields = ['nivel_estudios', 'especializacion', 'años_experiencia' ,'certificaciones']
        
        

class RegistroUsuarioTutorSerializer(serializers.Serializer):
    user = RegistroUsuarioSerializer()
    tutor = RegistroTutorSerializer()

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        tutor_data = validated_data.pop('tutor')

        # Crear el usuario
        user = User(
            email=user_data['email'],
            full_name=user_data['full_name'],
            estado=user_data['estado'],
            cedula=user_data['cedula'],
            genero=user_data['genero'],
            id_perfil_FK=user_data['id_perfil_FK'], 
            telefono=user_data['telefono'],
            fecha_nacimiento=user_data['fecha_nacimiento'],  
        )
        email_username, _ = user.email.split("@")
        user.username = email_username
        user.set_password(user_data['password'])  # Establece la contraseña de forma segura
        user.save()  # Guarda el usuario en la base de datos

        # Crear el tutor y asociarlo al usuario
        tutor = api_models.Tutor.objects.create(id_user_FK=user, **tutor_data)

        return {'user': user, 'tutor': tutor}


#####################################################  
### Modulo de Creación de Usuario y Representante ###
##################################################### 

class RegistroRepresentanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Representante
        fields = ['parentesco', 'ocupacion', 'nivel_estudios', 'telefono_auxiliar']
        
class RegistroUsuarioRepresentanteSerializer(serializers.Serializer):
    user = RegistroUsuarioSerializer()
    representante = RegistroRepresentanteSerializer()
    
    def create(self, validated_data):
        
        user_data = validated_data.pop('user')
        representante_data = validated_data.pop('representante')

        user = User(
            email=user_data['email'],
            full_name=user_data['full_name'],
            estado=user_data['estado'],
            cedula=user_data['cedula'],
            genero=user_data['genero'],
            id_perfil_FK=user_data['id_perfil_FK'], 
            telefono=user_data['telefono'],
            fecha_nacimiento=user_data['fecha_nacimiento'], 
        )
        email_username, _ = user.email.split("@")
        user.username = email_username
        user.set_password(user_data['password']) 
        user.save() 
        
        representante = api_models.Representante.objects.create(id_user_FK=user, **representante_data)
        
        return {'user': user, 'representante': representante}
    
    
    
####################################################  
###  Modulo de Creación de Usuario y Estudiante  ###
####################################################


class RegistroEstudianteSerializer(serializers.ModelSerializer):
    representante = serializers.PrimaryKeyRelatedField(queryset=api_models.Representante.objects.all(), source='id_representante_FK')

    class Meta:
        model = api_models.Estudiante
        fields = ['estado_academico', 'observaciones', 'representante']  # Campos ajustados según el modelo



class RegistroUsuarioEstudianteSerializer(serializers.Serializer):
    user = RegistroUsuarioSerializer()
    estudiante = RegistroEstudianteSerializer()
    

    def create(self, validated_data):
        
        user_data = validated_data.pop('user')
        estudiante_data = validated_data.pop('estudiante')

        user = User(
            email=user_data['email'],
            full_name=user_data['full_name'],
            estado=user_data['estado'],
            cedula=user_data['cedula'],
            genero=user_data['genero'],
            id_perfil_FK=user_data['id_perfil_FK'], 
            telefono=user_data['telefono'],
            fecha_nacimiento=user_data['fecha_nacimiento'], 
        )
        
        email_username, _ = user.email.split("@")
        user.username = email_username
        user.set_password(user_data['password']) 
        user.save()
        
        estudiante = api_models.Estudiante.objects.create(id_user_FK=user, **estudiante_data)
        
        return {'user': user, 'estudiante': estudiante}
    
    
################################### 
### Modulo de Creación de Curso ###
################################### 

class CursoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = api_models.Curso
        fields = '__all__'
        
######################################### 
### Modulo de Creación de Asignaturas ###
#########################################

class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Asignaturas
        fields = '__all__'

##################################### 
### Modulo de Creación de Tutoría ###
#####################################      

class TutoriaSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = api_models.Tutoria
        fields = '__all__'
        

###############################
### Modulo de Matriculación ###
############################### 

class MatriculaSerializer(serializers.ModelSerializer):
    estudiante = serializers.PrimaryKeyRelatedField(queryset=api_models.Estudiante.objects.all(), source='id_estudiante_FK')
    curso = serializers.PrimaryKeyRelatedField(queryset=api_models.Curso.objects.all(), source='id_curso_FK')
    
    class Meta:
        model = api_models.Matriculas
        fields = ['estudiante', 'curso', 'jornada', 'año_lectivo']
        
    def validate(self, data):
        estudiante = data.get('id_estudiante_FK')  # Corregido para coincidir con el modelo
        curso = data.get('id_curso_FK')  # Corregido para coincidir con el modelo
        año_lectivo = data.get('año_lectivo')
        jornada = data.get('jornada')

        # Verificar si ya existe una matrícula con estos datos
        if api_models.Matriculas.objects.filter(id_estudiante_FK=estudiante, id_curso_FK=curso, año_lectivo=año_lectivo, jornada=jornada).exists():
            # Obtener los detalles del estudiante y el curso
            estudiante_nombre = estudiante.nombre if hasattr(estudiante, 'nombre') else str(estudiante)
            curso_nombre = curso.curso if hasattr(curso, 'nombre') else str(curso)

            # Crear un mensaje personalizado
            mensaje_error = (
                f"El estudiante '{estudiante_nombre}' ya está matriculado "
                f"en el curso '{curso_nombre}' para el año lectivo {año_lectivo} "
                f"en la jornada {jornada}."
            )
            raise serializers.ValidationError(mensaje_error)

        return data
        
######################################################## 
### SERIALIZADOR DE OPCIONES PARA CREACION DE CURSOS ###
########################################################  

class OpcionCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.opcionCurso
        fields = '__all__'
        
class OpcionParaleloSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.opcionParalelo
        fields = '__all__'
        
############################################################### 
### SERIALIZADOR DE OPCIONES PARA CREACION DE uSUARIO TUTOR ###
###############################################################
        
class OpcionTitulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.opcionTitulos
        fields = '__all__'
        
############################################################### 
### SERIALIZADOR DE OPCIONES PARA CREACION DE USUARIO REPRE ###
###############################################################        
class OpcionNivelEstudiosSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.opcionNivelEstudios
        fields = '__all__'
        
#################################  
### Modulo de Listar Tutores  ###
#################################  

class TutorListSerializer(serializers.ModelSerializer):
    id_user_FK = UserSerializer()  # Campo anidado para el usuario relacionado

    class Meta:
        model = api_models.Tutor
        fields = [
            'id', 'nivel_estudios', 'especializacion', 'años_experiencia', 
            'certificaciones', 'id_user_FK'
        ] 
        
#######################################  
### Modulo de Listar Representante  ###
#######################################          

class RepresentanteListSerializer(serializers.ModelSerializer):
    id_user_FK = UserSerializer()

    class Meta:
        model = api_models.Representante
        fields = '__all__'

#######################################  
### Modulo de Listar Estudiantes  ###
#######################################        

class EstudianteListSerializer(serializers.ModelSerializer):
    id_user_FK = UserSerializer()
    id_representante_FK = RepresentanteListSerializer()
    
    class Meta:
        model = api_models.Estudiante
        fields = '__all__'
        
        
class MatriculasListSerializer(serializers.ModelSerializer):
    id_estudiante_FK = EstudianteListSerializer()
    id_curso_FK = CursoSerializer()
    
    class Meta: 
        model = api_models.Matriculas
        fields = '__all__'
    