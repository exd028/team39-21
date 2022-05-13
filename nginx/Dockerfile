# The first stage
# Build React static files
FROM node:12.18.3-alpine as build

WORKDIR /app/frontend
COPY /./frontend/package*.json ./
RUN npm ci
COPY ./frontend/ ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
