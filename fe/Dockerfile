# Common build stage
FROM node:16.14 as common-build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-deps

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

EXPOSE 3000

# Development build stage
FROM common-build-stage as dev

ENV REACT_APP_API_HOST=http://localhost:5000
ENV NODE_ENV development

CMD ["npm", "run", "start"]

# Production build stage
FROM common-build-stage as build

ENV NODE_ENV production

ARG REACT_APP_API_HOST=http://teddlab.digital:5000
RUN npm run build

FROM nginx:1.21.0-alpine as prod
COPY --from=build /app/build/ /var/www/
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
