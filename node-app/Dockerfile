FROM node:16

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install

COPY admin-client ./admin-client
RUN pnpm install

COPY server ./server
RUN pnpm install

RUN pnpm admin-client:build
RUN pnpm server:build

EXPOSE 3000

CMD [ "pnpm", "start:prod" ]
