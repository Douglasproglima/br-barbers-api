<div align="center" style="margin-bottom: 20px;">
<img alt="gobarber" src="./others/images/logo.png" width="auto" heigth="auto"/>
</div>

## :br-barber: O projeto

Aplicação para agendar e gerenciar serviços de beleza, onde prestadores de serviços podem se cadastrar,
e usuários poderão marcar agendamentos com estes provedores.

## :fire: Prévia da Aplicação

<div align="center">
<img src="https://media.giphy.com/media/Lm6bmg75wR7Llcf9JG/giphy.gif" alt="preview"/>
</div>

### :rocket: Tecnologias Usadas

O projeto foi feito com as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en/)
- [ReactJS](https://pt-br.reactjs.org/)
- [ExpressJS](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)
- [Yup](https://github.com/jquense/yup)
- [Styled-Components](https://styled-components.com/)
{...}

## :hammer: Deploy da Aplicação
{...}


## :zap: Executando o Projeto
#### Clonando o projeto
```sh
$ git clone https://github.com/Douglasproglima/br-barbers-api.git
$ cd gobarber
```
#### Iniciando a API
```sh
$ cd api

# Criando a imagem Docker do banco de dados:
# Dentro do projeto, já existe uma arquivo docker-compose.yml que possui o
# PostgreSQL como banco de dados, basta ter o Docker instalado em sua máquina.
$ docker-compose up -d # Iniciará em background e não irá bloquear o shell

# Rodando as migrations para o banco de dados e iniciando o projeto
$ yarn && yarn typeorm migration:run && yarn dev:server
```

#### Iniciando o Backend
```sh
$ cd web
$ yarn && yarn dev
```


#### Iniciando o Frontend
```sh
$ cd backend
$ yarn && yarn start
```
#### Iniciando o Mobile(Android)
```sh
$ cd mobile
$ yarn && yarn android && yarn start
```

### :memo: Licença

Este projeto é desenvolvido sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para saber mais detalhes.

<p align="center" style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">Feito com :purple_heart: by <strong> Douglas Lima</strong> </p>
