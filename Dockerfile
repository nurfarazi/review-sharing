FROM node:8

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN yarn
RUN yarn build

EXPOSE 4060

CMD ["yarn", "serve"]
