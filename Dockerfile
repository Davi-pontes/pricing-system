FROM node:lts-alpine

WORKDIR /PRECIFICATION-BACK-END

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Executa as migrations antes de iniciar o servidor
# RUN npm run createDataBase

# RUN npm run migrate

EXPOSE 3000

CMD ["npm", "run", "start"]
