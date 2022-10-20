# Common build stage
FROM node:16.14 as common-build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

RUN chown -R node:node /app

COPY . .

EXPOSE 3000

# Development build stage
FROM common-build-stage as dev

ENV NODE_ENV development

CMD ["npm", "run", "start"]

# Production build stage
FROM common-build-stage as prod

ENV NODE_ENV production

ARG REACT_APP_API_HOST=https://localhost:5000
RUN npm run build

FROM nginx:1.23.2-alpine
COPY --from=prod /app/build/ /var/www/
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
