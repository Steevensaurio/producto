# Usa una imagen base de Python
FROM python:3.12

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de requisitos y el código de la aplicación
COPY requirements.txt .
RUN pip install -r requirements.txt  # Instala las dependencias
COPY . .

# Exponer el puerto
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["gunicorn", "-b", ":8080", "backend.wsgi"] 
