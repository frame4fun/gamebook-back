FROM keymetrics/pm2:latest-alpine

# Create app directory
WORKDIR /usr/src/app

ENV NPM_CONFIG_LOGLEVEL warn

EXPOSE 8080
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
