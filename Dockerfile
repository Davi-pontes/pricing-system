FROM node:latest

WORKDIR /PRECIFICATION-BACK-END

RUN apt update && apt upgrade -y
#RUN apt install -y git

#RUN apt install -y bash

RUN rm -rf ./node_modules
RUN rm -rf package-lock.json

COPY ./package.json .
RUN npm install
RUN npm run migrate

COPY . .

CMD npm run dev