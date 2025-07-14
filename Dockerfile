# Stage 1: build dev image
FROM node:20-alpine AS dev

WORKDIR /app

# Copy chỉ package*.json để tận dụng cache
COPY src/package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ code vào /app
COPY src/ .

# Đổi tên .env.local → .env để Vite hiểu
RUN cp .env.local .env

# Đưa node_modules vào PATH
ENV PATH /app/node_modules/.bin:$PATH

# Mặc định bạn sẽ override bằng `command:` trong docker-compose.yml
CMD ["npm", "run", "dev"]