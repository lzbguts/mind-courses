## Mind Courses
Sistema de gerenciamento de cursos, com autenticação de usuários e administradores. Feito para o Case Dev 2023 da Mind Consulting.

---

### Como executar
1. Abra um terminal na pasta `api` e execute os seguintes comandos:
    1. `npm install`, na primeira execução, para instalar os módulos necessários.
    2. `npm run start`, para iniciar a API.
        1. A porta da API é por padrão definida como `4000`. Para alterar, mude a chave `PORT` no arquivo `.env` (chave padrão: `PORT=4000`).
2. Abra outro terminal na pasta `mind-courses` e execute os seguintes comandos:
    1. `npm install`, na primeira execução, para instalar os módulos necessários.
    2. `npm run start`, para iniciar a aplicação React.
        1. Se a porta da API foi alterada, será necessário alterar a URL na aplicação também. No arquivo `.env`, altere a chave `REACT_APP_API` (chave padrão: `REACT_APP_API=http://localhost:4000`).
 
4. Agora é possível acessar a aplicação na URL `http://localhost:3000`.

---

### Autenticação
O sistema possui 2 usuários padrões:

Usuário - Email: `123@gmail.com` - Senha: `123`

Administrador - Email: `321@gmail.com` - Senha `321`

Para debug, é possível criar uma conta de administrador apenas com uma requisição customizada na url `/signUp` da API, possuindo a chave `secret` com o valor `adminX`.
#### Exemplo:
#### Faça uma requisição POST na URL `/signUp` da API, com o seguinte `body`:
```json
{
    "email": "321@gmail.com",
    "senha": "321",
    "secret": "adminX"
}
```

---

### Tecnologias
+ HTML
+ CSS
+ Javascript
+ Typescript
+ React
+ Node.js
+ BCrypt
+ Express
+ SQLite