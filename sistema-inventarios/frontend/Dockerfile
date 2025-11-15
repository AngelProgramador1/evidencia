# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del frontend
COPY . .

# Exponer el puerto que usa el servidor de desarrollo de React
EXPOSE 3000

# Comando para iniciar la aplicación en modo de desarrollo
CMD ["npm", "start"]
