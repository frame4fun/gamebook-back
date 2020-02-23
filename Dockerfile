FROM node:12.16.1-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --production

COPY src ./
COPY index.js ./

CMD [ "node", "index.js" ]
