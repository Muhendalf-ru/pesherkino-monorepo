FROM node:20-alpine AS build
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app
COPY package.json yarn.lock ./
COPY apps/bot ./apps/bot

WORKDIR /app/apps/bot
RUN yarn install --frozen-lockfile --production=false
RUN yarn build

FROM node:20-alpine
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app
COPY --from=build /app/apps/bot/dist ./dist
COPY --from=build /app/apps/bot/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --production=true

EXPOSE 4000
CMD ["node", "dist/main.js"]
