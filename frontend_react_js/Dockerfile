FROM node:18 AS build

WORKDIR /app

COPY package.json ./
COPY eslint.config.mjs ./
COPY src ./src

RUN npm install && npm run build

# Simple nginx-based serving
FROM nginx:1.25-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Optional: custom nginx.conf for routing
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
