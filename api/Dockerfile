FROM node:20-alpine3.17

WORKDIR /usr/app
COPY src /usr/app/src
COPY package*.json /usr/app
COPY tsconfig.json /usr/app
COPY .env.production /usr/app/.env

RUN npm install 


EXPOSE 4000

CMD ["npm" ,"start"]
