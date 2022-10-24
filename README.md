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

•	Čo ste použili?<br/>
Šifrovací skript je implementovaný v jazyku javascript s využitím backend platformy nodeJS. Využili sme knižnicu crypto, ktorá ponúka všetky funkcie ktoré sme potrebovali.

•	Stručný popis postupu šifrovania.<br/>
Vygeneruje sa 256 bitový náhodný symetrický kľúč a náhodný inicializačný vector o veľkosti 256 bitov. Následne sa tento symetrický kľúč zašifruje pomocou RSA súkromného kľúča o veľkosti 2048bitov. Na šifrovanie sme použili odporúčaný AES GCM mód. Kontrola integrity je vykonávaná prostredníctvom MAC módu. Veľkosti kľúčov sme zvolili podľa odporúčaní. Zvolené veľkosti sa považujú za bezpečné s ohľadom aj na výkon.

Zdrojový kód riešenia:</br>
https://github.com/MartinSiran/UPB-webapp
