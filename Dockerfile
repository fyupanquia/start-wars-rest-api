FROM node:12-alpine
RUN apk update && apk upgrade && apk add tzdata && apk add --no-cache bash
WORKDIR /srv/app
COPY . .
RUN npm install
EXPOSE 3001 5001

RUN echo "America/Lima" >  /etc/timezone
CMD ["node", "--use-strict", "server.js"]