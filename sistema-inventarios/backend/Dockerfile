# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de definición de paquetes e instalar dependencias
# Se copian por separado para aprovechar el cache de Docker
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que corre el backend
EXPOSE 3001

# El comando para iniciar el servidor
CMD ["npm", "start"]
