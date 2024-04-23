FROM node:bookworm-slim
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

CMD [ "node", "index.js" ]