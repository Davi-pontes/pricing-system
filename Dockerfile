FROM node:lts-alpine

WORKDIR /PRECIFICATION-BACK-END

COPY . .

RUN npm install

#RUN npm run createDataBase

#RUN npm run migrate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
