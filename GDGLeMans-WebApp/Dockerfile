FROM node:12.2.0 AS builder
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --configuration=production
FROM nginx:alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html/
