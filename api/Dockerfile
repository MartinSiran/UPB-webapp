# Common build stage
FROM node:16.14 as common-build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5000

# Development build stage
FROM common-build-stage as dev

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as prod

ENV NODE_ENV production

CMD ["npm", "run", "start"]
