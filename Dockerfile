# --- Estágio 1: Build da Aplicação ---
# Usamos a imagem padrão do Node 20, que é mais robusta que a 'alpine'
FROM node:20 AS builder
WORKDIR /usr/src/app

COPY package*.json ./
# Instala todas as dependências, incluindo as de desenvolvimento
RUN npm install

COPY . .
# Roda o build da sua aplicação TypeScript
RUN npm run build


# --- Estágio 2: Imagem Final de Produção ---
# Usamos a versão 'slim' que é menor mas ainda robusta
FROM node:20-slim
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
# Instala APENAS as dependências de produção. Isso torna a imagem final menor e mais segura.
RUN npm ci --omit=dev

# Copia os arquivos compilados do estágio anterior
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta que o NestJS usa (que será lida via process.env.PORT)
EXPOSE 8080

# Comando para iniciar a aplicação
CMD [ "node", "dist/main" ]