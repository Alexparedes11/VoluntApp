# Usa una imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de la aplicación al directorio de trabajo
COPY . .

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Instala las dependencias del proyecto
RUN npm install

# Expon el puerto 4200 para que la aplicación sea accesible desde el exterior
EXPOSE 4200

# Comando para iniciar la aplicación Angular con ng serve
CMD ["ng", "serve", "--host", "0.0.0.0"]