FROM node:20-alpine AS build
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app
COPY package.json yarn.lock ./
COPY apps/frontend-admin ./apps/frontend-admin

WORKDIR /app/apps/frontend-admin
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/apps/frontend-admin/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
