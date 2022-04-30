FROM node:15-alpine as builder

WORKDIR /app
RUN chmod 777 /app

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn build

FROM node:15-alpine

WORKDIR /app
RUN chmod 777 /app

COPY package.json yarn.lock ./
RUN yarn install --production
COPY --from=builder /app/dist dist

ENV HOST 0.0.0.0

EXPOSE 3001

CMD [ "node", "./dist" ]