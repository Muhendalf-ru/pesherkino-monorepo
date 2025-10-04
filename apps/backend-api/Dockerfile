FROM node:20-alpine AS build
WORKDIR /app

# Копируем общий yarn.lock и package.json
COPY package.json yarn.lock ./
COPY apps/backend-api ./apps/backend-api

WORKDIR /app/apps/backend-api
RUN yarn install --frozen-lockfile --production=false
RUN yarn build

FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/apps/backend-api/dist ./dist
COPY --from=build /app/apps/backend-api/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --production=true

EXPOSE 3002
CMD ["node", "dist/main.js"]
