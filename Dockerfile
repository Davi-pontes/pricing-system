FROM node:lts-alpine

WORKDIR /PRECIFICATION-BACK-END

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]