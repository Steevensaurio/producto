# Usa una imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del frontend
COPY . .

# Instala las dependencias del frontend
RUN npm install

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen de Nginx para servir el frontend
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
