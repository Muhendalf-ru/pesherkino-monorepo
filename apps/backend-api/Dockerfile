FROM node:20-alpine AS build
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app
COPY package.json yarn.lock ./
COPY apps/backend-api ./apps/backend-api

WORKDIR /app/apps/backend-api
RUN yarn install --inline-builds
RUN yarn build

FROM node:20-alpine
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app
COPY --from=build /app/apps/backend-api/dist ./dist
COPY --from=build /app/apps/backend-api/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

RUN yarn install --production --inline-builds

EXPOSE 3002
CMD ["node", "dist/main.js"]
