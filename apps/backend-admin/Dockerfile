# ====== Build stage ======
FROM node:20-alpine AS build

# Corepack + Yarn 4
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем весь репозиторий для работы с монорепо
COPY . .

# Устанавливаем все зависимости
RUN yarn install --inline-builds

# Собираем backend-admin
RUN yarn workspace backend-admin build

# ====== Runtime stage ======
FROM node:20-alpine

RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем package.json и yarn.lock для runtime
COPY package.json yarn.lock ./

# Копируем только собранный билд backend-admin
COPY --from=build /app/packages/backend-admin/dist ./dist
COPY --from=build /app/packages/backend-admin/package.json ./package.json

# Устанавливаем только production-зависимости для backend-admin
RUN yarn workspaces focus --production --pattern backend-admin

EXPOSE 3003

CMD ["node", "dist/main.js"]
