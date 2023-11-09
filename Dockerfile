ARG NODE_VERSION=18.18.2

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV="development"

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]