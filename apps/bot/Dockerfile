# Stage 1: build
FROM node:20-alpine AS build

# Corepack и Yarn 4
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем package.json и lockfile
COPY package.json yarn.lock ./

# Копируем весь workspace, чтобы Yarn видел пакеты
COPY packages ./packages
COPY apps/bot ./apps/bot

WORKDIR /app/apps/bot

# Устанавливаем все зависимости только для разработки и сборки
RUN yarn workspaces focus --all --production=false
RUN yarn build

# Stage 2: production
FROM node:20-alpine

RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем только собранное приложение
COPY --from=build /app/apps/bot/dist ./dist
COPY --from=build /app/apps/bot/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
COPY --from=build /app/packages ./packages

# Устанавливаем только production зависимости
RUN yarn workspaces focus --all --production

EXPOSE 4000
CMD ["node", "dist/main.js"]
