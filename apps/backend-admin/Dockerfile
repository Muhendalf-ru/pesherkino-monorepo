FROM node:20-alpine AS build
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app
COPY package.json yarn.lock ./
COPY apps/backend-admin ./apps/backend-admin

WORKDIR /app/apps/backend-admin
RUN yarn install --frozen-lockfile --production=false
RUN yarn build

FROM node:20-alpine
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app
COPY --from=build /app/apps/backend-admin/dist ./dist
COPY --from=build /app/apps/backend-admin/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --production=true

EXPOSE 3003
CMD ["node", "dist/main.js"]
