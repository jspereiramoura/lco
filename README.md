
<h1 align="center">LOC Labs Desafio Técnico</h1>
<h3 align="center"><a href="https://lco-iota.vercel.app/">Live Preview (Vercel)</a></h3>

<p align="center">
    <a href="#running">Rodando Localmente</a> •
    <a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a> •
    <a href="#features">Features</a> •
    <a href="#autor">Autor</a>
</p>

---

<h3 id="running">Rodando Localmente</h3>

Para rodar este projeto localmente você precisará ter instalado o Node 22.17.0, ou utilizar o NVM para instala-lo como demonstrado abaixo:

```bash
$ git clone https://github.com/jspereiramoura/lco.git
$ cd lco
$ nvm i 22.17.0
$ nvm use 22.17.0
$ npm install
$ npm run dev
```

---

### Tools and Technologies

Como sugerido no desafio, foi utilizado neste projeto React e Material UI. Além disso, algumas ferramentas que eu utilizei foram:

- Axios: para realização das requisições à API
- Redux Toolkit: controle de estado global
- Foram utilizadas ferramentas padrões de convenção de código como Husky, EsLint, Prettier e CommitLint.

E como API estou utilizando a [Platzi](https://fakeapi.platzi.com/)

### Features

- Telas: Categorias, Produtos por Categoria, Detalhe do Produto, Carrinho, 404 e Error boundary
- Partial Loading: A tela de produtos carrega os items conforme o usuário "scrola" a tela, evitando carregar todos itens de uma só vez
- Axios: Cacheamento com um TTL de 5 minutos utilizando IndexedDb como storage
- Redux: Cacheamento da store utilizando IndexedDB para manter o estado do carrinho

#### Observação

- Em um projeto real provavelmente seria utilizado o RTK Query para lidar com as requisições a API, devido a sua robustez, já que possuímos o Redux-Toolkit instalado neste projeto. Porém com a finalidade de demonstrar conhecimento em criação de hooks customizados para o React e soluções alternativas de cacheamento utilizei esta abordagem.
- Por se tratar de uma API pública pode ser que algumas imagens ou descrição estejam com problema, devido a testes de outros desenvolvedores. Para resolver este problema, adicionei um botão na tela de listagem de categoria que irá:
  - Remover as categorias vazias
  - Criar 3 categorias com 4 produtos cada
  - Fazer o reload da página

---

<div align="center">
<h3 id="autor">Autor</h3>

<strong>José Luiz de Moura Pereira - Front-end Developer</strong>

<div>
  <a href="https://www.linkedin.com/in/jspereiramoura" target="_blank">
    <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="32" alt="LinkedIn" />
  </a>
  <a href="mailto:joseluiz.zp@gmail.com">
    <img src="https://img.shields.io/static/v1?message=Gmail&logo=gmail&label=&color=D14836&logoColor=white&labelColor=&style=for-the-badge" height="32" alt="Gmail" />
  </a>
  <a href="https://discordapp.com/users/jspereiramoura" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Discord&logo=discord&label=&color=7289DA&logoColor=white&labelColor=&style=for-the-badge" height="32" alt="Discord" />
  </a>
</div>

</div>