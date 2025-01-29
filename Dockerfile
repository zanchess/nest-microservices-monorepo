FROM node:23-alpine

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --frozen-lockfile

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN yarn prisma generate
RUN yarn build

USER node

EXPOSE 3000

ENTRYPOINT ["yarn", "start:prod:api"]
