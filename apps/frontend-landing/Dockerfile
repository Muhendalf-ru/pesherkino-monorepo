# --------------------------
# stage 1: build
# --------------------------
FROM node:20-alpine AS build

# Включаем Corepack и активируем Yarn 4
RUN corepack enable \
    && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем общий package.json и yarn.lock
COPY package.json yarn.lock ./

# Копируем исходники фронтенда
COPY apps/frontend-landing ./apps/frontend-landing

WORKDIR /app/apps/frontend-landing

# Устанавливаем зависимости и собираем проект
RUN yarn install --frozen-lockfile
RUN yarn build

# --------------------------
# stage 2: production
# --------------------------
FROM nginx:alpine

# Копируем собранные файлы фронтенда
COPY --from=build /app/apps/frontend-landing/dist /usr/share/nginx/html

# Опционально можно добавить кастомный конфиг nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
