FROM node:15-alpine as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn build

FROM node:15-alpine

WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY --from=builder /usr/src/app/dist dist

RUN yarn install --production

ENV HOST 0.0.0.0

EXPOSE 3001

CMD [ "node", "./dist" ]