FROM node:18-alpine

WORKDIR /client

RUN apk add --no-cache xsel xclip

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
