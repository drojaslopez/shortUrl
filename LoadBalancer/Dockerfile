FROM node:lastest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]