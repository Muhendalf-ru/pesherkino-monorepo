# ====== Build stage ======
FROM node:20-alpine AS build

# Corepack + Yarn 4
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем весь репозиторий для монорепо
COPY . .

# Устанавливаем все зависимости для workspace
RUN yarn install --inline-builds

# Собираем backend-api
RUN yarn workspace backend-api build

# ====== Runtime stage ======
FROM node:20-alpine

RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем package.json и yarn.lock для runtime
COPY package.json yarn.lock ./

# Копируем только собранный билд backend-api
COPY --from=build /app/packages/backend-api/dist ./dist
COPY --from=build /app/packages/backend-api/package.json ./package.json

# Устанавливаем только production-зависимости для backend-api
RUN yarn workspaces focus --production --pattern backend-api

EXPOSE 3000

CMD ["node", "dist/main.js"]
