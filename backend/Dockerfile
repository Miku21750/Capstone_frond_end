# backend/Dockerfile
FROM node:18

WORKDIR /app
COPY . .

COPY .env .env

COPY package*.json ./
RUN npm install

EXPOSE 4000
CMD ["npm", "run", "start"]
