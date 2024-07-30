FROM node:lts-alpine

WORKDIR /PRECIFICATION-BACK-END

COPY package*.json ./

RUN npm install

RUN npm run createDataBase

RUN npm run migrate

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
