# Stage 1: dev
FROM node:20-alpine AS dev

WORKDIR /app
COPY src/package*.json ./
RUN npm install

# Copy toàn bộ code và mount volume ở docker-compose để live-reload
COPY src/ ./
ENV PATH /app/node_modules/.bin:$PATH

CMD ["npm", "run", "dev"]
