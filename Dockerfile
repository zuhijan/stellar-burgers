FROM node:14.15.4
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN yarn install
COPY . /usr/src/app
EXPOSE 3000
CMD [ "yarn", "start" ]
