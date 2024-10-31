# Etapa 1: Construção da aplicação
FROM node:18 AS build

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Construa a aplicação
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine

# Copie os arquivos construídos para o diretório de Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exponha a porta 3000
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
