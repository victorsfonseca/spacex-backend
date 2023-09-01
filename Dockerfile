FROM node:18.17.0-alpine

ENV HOME=/home/app
WORKDIR $HOME

COPY ./src  ./src
COPY tsconfig.json ./
COPY package.json ./
COPY launch.json ./
COPY jest.config.js ./

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]