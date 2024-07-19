FROM node:lts-alpine

WORKDIR /PRECIFICATION-BACK-END

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm run migrate

EXPOSE 3000

CMD ["npm", "run", "dev"]
