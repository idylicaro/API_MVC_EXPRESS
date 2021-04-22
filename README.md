# trainee-itatechjr-2021

# Como executar:
``` npm i ``` or ```yarn install ```
``` npx prisma migrate dev ``` or ```yarn add global prisma && yarn prisma migrate dev ```

- (OBS) Foi utilizado o ORM Prisma para a facilidade de verificar o banco de dados independente do SO e do banco de dados, estarei usando o sqlite por agiliade no desenvolvimento devido ao tempo.

# Rotas:
### (BASE URL) http://localhost:5050/api
- Users:
    - (GET)     http://localhost:5050/api/users
    - (GET)     http://localhost:5050/api/users/:id
    - (POST)    http://localhost:5050/api/users
    - (UPDATE)  http://localhost:5050/api/users/:id
    - (DELETE)  http://localhost:5050/api/users/:id

- Products:
    - (GET)     http://localhost:5050/api/products
    - (GET)     http://localhost:5050/api/products/:id
    - (POST)    http://localhost:5050/api/products
    - (UPDATE)  http://localhost:5050/api/products/:id
    - (DELETE)  http://localhost:5050/api/products/:id

- Sales:
    - (GET)     http://localhost:5050/api/sales
    - (GET)     http://localhost:5050/api/sales/:id
    - (GET)     http://localhost:5050/api/sales?id_user=?&id_product=?
    - (POST)    http://localhost:5050/api/sales
    - (UPDATE)  http://localhost:5050/api/sales/:id
    - (DELETE)  http://localhost:5050/api/sales/:id

## TODO:

- [X] CRUD of USERS
- [X] CRUD of PRODUCTS
- [X] CRUD of SALES