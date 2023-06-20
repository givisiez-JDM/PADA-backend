FROM node:18.12-alpine

WORKDIR /

COPY package* .

RUN npm install

COPY . .

EXPOSE 3001

ENV POSTGRES_DATABASE=vacina

CMD ["npm", "start"]