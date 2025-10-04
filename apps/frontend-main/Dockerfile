FROM node:20-alpine AS build
RUN corepack enable && corepack prepare yarn@4.10.2 --activate

WORKDIR /app
COPY package.json yarn.lock ./
COPY apps/frontend-main ./apps/frontend-main

WORKDIR /app/apps/frontend-main
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/apps/frontend-main/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
