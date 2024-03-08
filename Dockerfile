FROM node:20-alpine

RUN apk add --no-cache git

RUN git clone https://github.com/crypticclippedu/Science-Math.git

WORKDIR /Science-Math

RUN npm install

CMD npm start