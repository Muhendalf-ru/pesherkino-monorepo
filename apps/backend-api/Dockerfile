# ====== Build stage ======
FROM node:20-alpine AS build

# Corepack + Yarn 4
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем весь репозиторий для монорепо
COPY . .

# Устанавливаем все зависимости для workspace
RUN yarn install --inline-builds

# Собираем backend-admin
WORKDIR /app/apps/backend-admin
RUN yarn build

# ====== Runtime stage ======
FROM node:20-alpine

RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app

# Копируем только собранный билд и package.json
COPY --from=build /app/apps/backend-admin/dist ./dist
COPY --from=build /app/apps/backend-admin/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

# Устанавливаем только production-зависимости для backend-admin
RUN yarn workspaces focus --production --all

EXPOSE 3003
CMD ["node", "dist/main.js"]
