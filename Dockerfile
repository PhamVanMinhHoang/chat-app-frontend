# Stage 1: dev
FROM node:20-alpine AS dev

WORKDIR /app
COPY src/package*.json ./
RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

CMD ["npm", "run", "dev"]
