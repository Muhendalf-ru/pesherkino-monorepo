# ====== Build stage ======
FROM node:20-alpine AS build

# Corepack + Yarn 4
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем весь репозиторий, чтобы Yarn видел workspace пакеты
COPY . .

# Устанавливаем все зависимости (включая dev)
RUN yarn install --inline-builds

# Собираем bot
RUN yarn workspace bot build

# ====== Runtime stage ======
FROM node:20-alpine

RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем только собранный билд и package.json для bot
COPY --from=build /app/apps/bot/dist ./dist
COPY --from=build /app/apps/bot/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

# Устанавливаем только production-зависимости для bot
RUN yarn workspaces focus --production --pattern bot

EXPOSE 4000

CMD ["node", "dist/main.js"]
