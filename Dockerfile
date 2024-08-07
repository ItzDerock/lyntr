## Base docker image
# Only contains the project dependencies
FROM node:lts-bullseye-slim as base
WORKDIR /app

COPY package.json package-lock.json .npmrc /app/
COPY patches/ /app/patches/
RUN npm install

## Builder
# transpiles the source code
FROM base as builder

COPY . .
RUN npm run build

## Runner
# only contains production dependencies
FROM base as runner

RUN npm prune --production
COPY --from=builder /app/build ./build

EXPOSE 5999/tcp

ENV HOST=0.0.0.0
ENV PORT=5999
ENV BODY_SIZE_LIMIT=8000000

CMD ["node", "build/index.js"]
