FROM node:18 as builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:latest

WORKDIR /app

COPY --from=builder /app/dist /app/www

RUN echo 'server { \
  listen 5173; \
  \
  location / { \
  access_log off; \
  root /app/www; \
  try_files $uri $uri/index.html /index.html; \
  } \
  }\
  ' > /etc/nginx/conf.d/default.conf

EXPOSE 5173
