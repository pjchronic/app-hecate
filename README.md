# Hecate - App

## Do que se trata?

O Hecate - App é feito por um rpgista, para outros rpgistas. Se trata de uma aplicação para administrar suas fichas de RPG. O intuito do app é funcionar não só para armazenar as fichas de seus personagens mas também facilitar o a utilização no geral, como a usabilidade das fichas, acesso as informações com mais intuitividade, facilidade de criação e de upgrades entre níveis.

O app é destinado não só para os mestres de suas mesas, mas também para os jogadores.

**Neste momento ainda estamos em fase de construção! Contribuições são bem-vindas**

----

# Dependências pré instalação

É necessário um **.env** com as variáveis de ambiente:

- **RESEND_API_KEY:** Necessário para o uso da biblioteca Resend para o envio dos e-mails;
- **JWT_SECRET:** É uma string aleatória de 32 bytes codificada em Base64;
- **DOMINIO:** Para string URL que é enviada nos links de convite e redefinição de senha;

---

# Instalação

Ao clonar projeto, execute primeiro a instalação dos pacotes.

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

Em seguida para executar o projeto, rode o seguinte comando: 

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

O projeto estará disponível para acesso via browser no link: [http://localhost:3000](http://localhost:3000)

---

# Bibliotecas utilizadas

- [React mail](https://react.email)

- [TsParticles](https://particles.js.org)

- [Bcrypt](https://www.npmjs.com/package/bcrypt)

- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

- [Resend](https://www.resend.com/home)

- [Sequelize](http://sequelize.org)

- [Sqlite](https://www.npmjs.com/package/sqlite3)

- [Styled-Components](https://styled-components.com)
  
  
