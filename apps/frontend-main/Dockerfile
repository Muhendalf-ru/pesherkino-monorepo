# ====== Build stage ======
FROM node:20-alpine AS build

# Corepack + Yarn 4
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем весь репозиторий, чтобы Yarn видел workspace пакеты
COPY . .

# Устанавливаем все зависимости для сборки (включая dev)
RUN yarn install --inline-builds

# Собираем frontend-main
WORKDIR /app/apps/frontend-main
RUN yarn build

# ====== Runtime stage ======
FROM nginx:alpine

# Копируем готовый билд
COPY --from=build /app/apps/frontend-main/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
