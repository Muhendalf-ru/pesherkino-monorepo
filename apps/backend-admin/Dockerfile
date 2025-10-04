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

# Копируем исходники backend-admin
COPY apps/backend-admin ./apps/backend-admin

WORKDIR /app/apps/backend-admin

# Устанавливаем зависимости и собираем проект
RUN yarn install --frozen-lockfile --production=false
RUN yarn build

# --------------------------
# stage 2: production
# --------------------------
FROM node:20-alpine

# Включаем Corepack и активируем Yarn 4
RUN corepack enable \
    && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем сборку и необходимые файлы
COPY --from=build /app/apps/backend-admin/dist ./dist
COPY --from=build /app/apps/backend-admin/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

# Устанавливаем только production зависимости
RUN yarn install --frozen-lockfile --production=true

EXPOSE 3003
CMD ["node", "dist/main.js"]
