# Usa una imagen oficial de Python como base
FROM python:3.12-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del backend
COPY . .

# Instala las dependencias del backend
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto 8000
EXPOSE 8000

# Comando para correr el servidor de Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
