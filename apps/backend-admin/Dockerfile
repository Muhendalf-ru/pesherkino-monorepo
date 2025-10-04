# stage 1: build
FROM node:20-alpine AS build
WORKDIR /app

# Копируем общий yarn.lock и package.json
COPY package.json yarn.lock ./
COPY apps/backend-admin ./apps/backend-admin

WORKDIR /app/apps/backend-admin
RUN yarn install --frozen-lockfile --production=false
RUN yarn build

# stage 2: production
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/apps/backend-admin/dist ./dist
COPY --from=build /app/apps/backend-admin/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --production=true

EXPOSE 3003
CMD ["node", "dist/main.js"]
