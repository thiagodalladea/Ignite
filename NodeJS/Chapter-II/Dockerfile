FROM node

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 3333 

CMD ["npm","run","dev"]