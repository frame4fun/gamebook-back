FROM node:12.18.0-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --production

COPY src src/
COPY index.js ./

EXPOSE 3002
CMD [ "node", "index.js" ]
