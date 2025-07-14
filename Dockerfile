# Stage 1: dev
FROM node:20-alpine AS dev

WORKDIR /app

COPY src/package*.json ./
RUN npm install

# 👇 Copy toàn bộ src, bao gồm .env.local
COPY src .

# 👇 Rename .env.local thành .env để Vite hiểu
RUN cp .env.local .env

ENV PATH /app/node_modules/.bin:$PATH

CMD ["npm", "run", "dev"]
