# 🏎 CAR SHOP 🏎
## Description
- Estruturei uma API TypeScript na arquitetura MSC, aplicando os pilares de POO e utilizando o ODM Mongoose para se conectar com um banco de dados MongoDB.
# Habilidades
Neste projeto, foi realizado:
- O conhecimento dos pilares da `Programação Orientada a Objetos`: `Herança`, `Abstração`, `Encapsulamento` e `Polimorfismo`;
- A utilização de `Composição`;
- A criação e utilização de `Interfaces`;
- A Implementação, em `TypeScript`: `Classes`, `Instâncias`, `Atributos`, `Métodos` e `Objetos`;
- Os conhecimentos de `MongoDB`, `Typescript` e `POO` para criar uma API com `CRUD`.
---
## O que foi desenvolvido
- Para este projeto, apliquei os princípios de `POO` para a contrução de uma API com `CRUD` para gerenciar uma concessionária de veículos utilizando o banco de dados `MongoDB`.
---
## 🔨 Ferramentas 
* TypeScript/ JavaScript
* NodeJS
* Express/ Router
* MongoDB/ Mongoose
* Mocha/ Chai/ Sinon
* Programação-orientada-objetos(POO)
## 🟡 Instalção de dependências 
Instala todas as dependências
 `npm install`

Você precisará do MongoDB para depurar este projeto, caso não o tenha em seu PC recomendo que siga estes 2 passos para usar o MongoDB com o Docker:
Você precisará do MongoDB para depurar este projeto, caso não o tenha em seu PC recomendo que siga estes 2 passos para usar o MongoDB com o Docker:
  * Download a imagem MongoDB: 
    `docker pull mongo`
  * Crie um container:
    `docker run --name <a-name-you-want> -p 27017:27017 -d mongo`
## 🟢 Endpoints
#### 🛻 Cars
* POST /cars
* GET /cars
* GET /cars/:id
* PUT /cars/:id
* DELETE /cars/:id

## Executando aplicação
- Inicialize o projeto na sua maquina:
  - `npm run dev`
- rotas:
  - http://localhost:3001/cars
## Executando Testes
- Para rodar os testes:
  `npm run test:dev`
- Para ver a cobertura de testes:
  `npm run test:covarage`
