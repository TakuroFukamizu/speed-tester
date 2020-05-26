FROM node:12-alpine

# ENV TOKEN
ENV CRONTAB="*/10 * * * *"

WORKDIR /app

RUN apk update && \
    apk add git && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
ENTRYPOINT ["yarn", "start"]