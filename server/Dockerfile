# backend/Dockerfile
FROM node:16

WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
