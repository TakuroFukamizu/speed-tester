FROM node:12-alpine

ARG TZ="Asia/Tokyo"

# ENV TOKEN
ENV CRONTAB="*/10 * * * *"

WORKDIR /app

RUN apk update && \
    apk add --no-cache git && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

RUN apk add --update --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo TZ > /etc/timezone && \
    apk del tzdata

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
ENTRYPOINT ["yarn", "start"]