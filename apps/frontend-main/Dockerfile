# Stage 1: build
FROM node:20-alpine AS build

# Corepack и Yarn 4
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем package.json и lockfile
COPY package.json yarn.lock ./

# Копируем весь workspace, чтобы Yarn видел все пакеты
COPY packages ./packages
COPY apps/frontend-main ./apps/frontend-main

WORKDIR /app/apps/frontend-main

# Устанавливаем зависимости с учётом workspace
RUN yarn workspaces focus --all --production=false

# Собираем фронтенд
RUN yarn build

# Stage 2: production
FROM nginx:alpine

# Копируем готовый билд
COPY --from=build /app/apps/frontend-main/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
