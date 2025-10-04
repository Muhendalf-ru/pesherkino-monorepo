# ====== Build stage ======
FROM node:20-alpine AS build

# Corepack + Yarn 4
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем весь репозиторий, чтобы Yarn видел workspace пакеты
COPY . .

# Устанавливаем все зависимости для сборки (включая dev)
RUN yarn install --inline-builds

# Собираем frontend-admin
RUN yarn workspace frontend-admin build

# ====== Runtime stage ======
FROM nginx:alpine

# Копируем готовый билд в директорию nginx
COPY --from=build /app/packages/frontend-admin/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
