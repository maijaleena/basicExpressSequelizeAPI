FROM node:14

EXPOSE 3001

WORKDIR /src

RUN npm install i npm@latest -g

COPY package.json package-lock*.json ./

RUN npm install

COPY /wait-for-it.sh .
RUN chmod +x wait-for-it.sh

COPY . .

CMD ["node", "app/index.js"]
