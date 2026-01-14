<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>



<h2 align="center">Client- Gateway With NestJS </h2>

<h3 align="left">Run in development</h3>

1.- Clone the repository
```
git clone https://github.com/NestJS-microservices-Huguez/Client-Gateway.git
```
2.- Install dependencies
```
npm install
```

3.- rename .env.template to .env and write variables
```
PORT         = ********
NATS_SERVERS = ********
```

4.- Nats
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats 
```

5.- Got to
```
http://localhost:8222/
```

6.- Run the service in development
```
npm run dev
```
