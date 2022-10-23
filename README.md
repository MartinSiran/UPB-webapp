# Web App (UPB)

## project structure

frontend - [ReactJS](https://reactjs.org/)  
backend - [Node.js](https://nodejs.org/en/)  
database - [MySQL](https://www.mysql.com/)

## usage
1. rename all `.template` files to end with `.env`

2. start docker containers
```
docker compose up [-d] [--build]
```
`-d` => run in background

`--build` => force build of images

3. go to http://localhost:3000

Frontend (ReactJS) - port 3000

Backend (NodeJS) - port 5000

Database (MySQL) - port 3306

4. shut down docker containers
```
docker compose down
```

## add libraries

1. in `./api` or `./fe` - run `npm install [lib_name]`

2. apply changes by rebuilding images
```
docker compose down
docker compose up --build
```
