FROM node:latest

ENV PORT ${PORT}

ENV FILE_DIRECTORY ${FILE_DIRECTORY}

WORKDIR /container2

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 2000

CMD ["node", "index.js"]