# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si existe)
# Esto optimiza el caché de Docker: si tus dependencias no cambian,
# no se reinstalarán en cada build.
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación Node.js escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]