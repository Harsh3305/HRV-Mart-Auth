FROM node

WORKDIR /usr/src/app

ENV HASH_SECRET=SECRETE
ENV JWT_SECRET=SECRETE
ENV BACKEND_URL=http://localhost:8080

COPY package*.json ./

RUN npm i
COPY . .

EXPOSE 3000 8080
CMD [ "node", "src/index.js" ]
