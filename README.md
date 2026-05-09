# Precification Back-end

API para gerenciamento de precificação, produtos, categorias, estoque, pedidos e usuários.

Descrição
- Projeto back-end em TypeScript que expõe endpoints para cadastro e manutenção de produtos, cálculo de preço, controle de estoque, pedidos, métodos de pagamento e dashboard.
- Usa Express, Knex (MySQL), JWT via cookie e suporta upload de planilhas XLSX para importação.

Principais funcionalidades
- Autenticação de usuário (login + validação de sessão via cookie `token`).
- CRUD de produtos (incluindo duplicação e criação apenas do produto sem ingredientes).
- CRUD de categorias.
- Gestão de ingredientes do produto e atualização de estoque por ingrediente.
- Cálculo de preços/precificação para produtos com ou sem ingredientes.
- Criação e consulta de pedidos.
- Upload de arquivos XLSX para importação de dados.
- Dashboard com métricas/relatórios básicos.
- Deploy automatica via worflows com github actions.

Tecnologias
- Node.js + TypeScript
- Express
- Knex + mysql2
- Multer (upload de arquivos)
- Jest (testes)
- TSX / tsup para desenvolvimento/build

Estrutura (resumida)
- `src/routes` — rotas da API (produto, categoria, cálculo, pedido, login, usuário, estoque, upload, dashboard, etc.)
- `src/controller` — regras dos controllers
- `src/repository` — acesso ao banco (queries via Knex)
- `src/database` — conexão, migrations e seeds
- `__test__` — testes unitários / integração

Variáveis de ambiente
Crie um arquivo `.env` na raiz com as variáveis abaixo (exemplo):

PORT=3000
KNEX_CLIENT=mysql2
KNEX_USER=root
KNEX_PASSWORD=senha
KNEX_HOST=127.0.0.1
KNEX_PORT=3306
KNEX_DATABASE=precification_db
SECRET=minha_chave_jwt

Instalação
1. Clone o repositório

```bash
git clone <repo-url>
cd pricing-system
```

2. Instale dependências

```bash
npm install
```

3. Configure o `.env` conforme exemplo acima.

Banco de dados
- O projeto usa Knex para migrations/seeds. Exemplos de comandos:

```bash
npm run migrate       # aplica migrations
npm run make          # cria uma migration (usando knex)
npm run seed          # executa seeds
npm run seed:make     # cria um seed
npm run create:database # script para criar o database via script TS
```

Rodando a aplicação
- Desenvolvimento (com recarga via `tsx`):

```bash
npm run dev
```

- Build e start (produção):

```bash
npm run build
npm run start
```

- Usando Docker (se preferir):

```bash
docker-compose up --build
```

Scripts úteis
- `npm run test` — executa testes com Jest
- `npm run dev` — inicia servidor em modo desenvolvimento
- `npm run build` — empacota TS para `dist`

Autenticação
- O login retorna um cookie `token` (httpOnly) usado pela aplicação para autenticar rotas protegidas.
- Algumas rotas exigem autenticação; há middleware que valida token e permissões (admin).

Principais endpoints
(resumo baseado nos arquivos em `src/routes`)
- `POST /login` — efetua login; `GET /login/validate` — valida sessão
- `POST /signup` — cria usuário
- `GET /product` — lista produtos
- `GET /product/specific?id=...` — obtém produto por id
- `POST /product` — cria produto (com ingredientes)
- `POST /product/only` — cria apenas o produto sem ingredientes
- `POST /product/duplicate` — duplica produto
- `PUT /product` — atualiza produto e ingredientes
- `DELETE /product` — remove produto
- `GET /category` — lista categorias
- `POST /category` — cria categoria
- `PATCH /category` — atualiza categoria
- `DELETE /category` — remove categoria
- `POST /calculation` — cálculo de preço para produto sem ingredientes
- `POST /calculation/product-ingredient` — cálculo para produto com ingredientes
- `GET /order` — lista pedidos
- `POST /order` — cria pedido
- `GET /stock` — consulta estoque
- `POST /stock/entry` — entrada de estoque
- `POST /stock/output` — saída de estoque
- `POST /upload/xlsx` — upload de planilha (rota protegida)
- `GET /dashboard` — dados para dashboard
- `GET /user/:id` — obtém usuário por id
- `PUT /user` — atualiza perfil do usuário
- `PATCH /user/disable` / `PATCH /user/activate` — desativa/ativa usuário
- Rotas administrativas protegidas: `/admin` (ex.: listagem de usuários)

Observações importantes
- Muitas rotas usam middleware de autenticação — certifique-se de fazer login antes de chamá-las.
- O `SECRET` é usado para assinatura/verificação de tokens; altere para um valor forte em produção.
- A configuração do Knex espera variáveis `KNEX_*` no `.env`.

Testes
- Execute `npm run test` para rodar a suíte de testes.

Contribuição
- Abra issues para bugs/funcionalidades.
- Faça PRs com branch por feature e descrição clara das alterações.

Licença
- Verifique a licença no `package.json` (atualmente `ISC`).

----

Se quiser, eu adapto este README com exemplos de requests (curl/postman), documentação Swagger ou resumo das tabelas/migrations — quer que eu inclua isso agora?
