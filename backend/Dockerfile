# backend/Dockerfile
FROM node:18

WORKDIR /app
COPY . .

COPY .env .env

RUN npm install

EXPOSE 4000
CMD ["npm", "run", "start"]
