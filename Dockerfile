FROM node:18.12-alpine

WORKDIR /

COPY package* .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]