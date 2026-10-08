# Lista de Tarefas (CLI)

Projeto simples de lista de tarefas para o terminal, desenvolvido com **JavaScript** e **Node.js**. Os dados ficam em um banco **PostgreSQL**, que sobe com **Docker Compose**, e a navegação é feita pelo teclado, com as setas.

Foi inspirado no curso de JavaScript do canal [Rincko Dev](https://www.youtube.com/@rinckodev), mas recebeu melhorias e adaptações próprias (veja a seção [Melhorias](#melhorias)).

> Esta é a versão com **PostgreSQL e Docker** (`v2.0.0`). A versão que guarda os dados em um arquivo JSON continua disponível na tag `v1.0.0`.

## Funcionalidades

- Criar tarefas
- Listar tarefas, com o status de cada uma
- Ver os detalhes de uma tarefa (nome, status e data de criação)
- Alterar o nome de uma tarefa
- Alterar o status: **Em andamento**, **Concluído** ou **Cancelado**
- Deletar tarefas
- Os dados continuam salvos no banco depois de fechar o programa

## Tecnologias

- [Node.js](https://nodejs.org/) (módulos ES)
- [@clack/prompts](https://github.com/bombshell-dev/clack) para os menus interativos no terminal
- [PostgreSQL](https://www.postgresql.org/) para o armazenamento das tarefas
- [pg](https://node-postgres.com/) (node-postgres), o driver que conecta o Node ao banco
- [dotenv](https://github.com/motdotla/dotenv) para ler as configurações do arquivo `.env`
- [Docker](https://www.docker.com/) e Docker Compose para rodar o banco em um container

## Como executar

Pré-requisitos:

- **Node.js 20.12 ou superior**
- **Docker** e **Docker Compose**

Não é preciso instalar o PostgreSQL na máquina: o banco roda dentro de um container.

**1. Clone o repositório e instale as dependências**

```bash
git clone <url-do-repositorio>
cd <pasta-do-projeto>
npm install
```

**2. Crie o arquivo `.env` a partir do exemplo**

```bash
cp .env.example .env
```

O `.env` guarda a conexão com o banco e não vai para o Git. Os valores de exemplo já funcionam com o Docker Compose, mas você pode trocar o usuário e a senha antes de subir o banco pela primeira vez.

**3. Suba o banco**

```bash
docker compose up -d
```

Na primeira vez, o Docker baixa a imagem do PostgreSQL, o que pode demorar um pouco. A tabela `tasks` é criada automaticamente a partir do arquivo `sql/schema.sql`, então não é preciso rodar nenhum script à mão.

O banco fica disponível na porta **5433** da sua máquina. Essa porta foi escolhida para não conflitar com um PostgreSQL que você já tenha instalado, que costuma usar a 5432.

**4. Inicie o programa**

```bash
npm start
```

Rode os comandos sempre a partir da **raiz do projeto**, que é onde ficam o `.env` e o `docker-compose.yml`.

### Parar e recomeçar

```bash
docker compose down        # para o banco e mantém os dados
docker compose down -v     # para o banco e APAGA todos os dados
```

Os dados ficam em um volume do Docker, por isso continuam salvos mesmo depois de parar o container. Use o `-v` só quando quiser recomeçar do zero. Isso também é necessário se você mudar o usuário ou a senha no `.env` depois de já ter subido o banco, porque o container só lê essas variáveis na primeira inicialização.

## Como usar

Use as setas **↑ / ↓** para navegar e **Enter** para confirmar. Em qualquer prompt, **Ctrl+C** cancela a ação atual e volta para a tela anterior.

```
Menu principal
├── Criar nova tarefa
├── Listar tarefas existentes
│   └── (escolha uma tarefa)
│       ├── Alterar nome
│       ├── Alterar status
│       ├── Deletar
│       └── Voltar
└── Sair
```

## Estrutura do projeto

```
.
├── src
│   ├── index.js                 # ponto de entrada
│   ├── menus
│   │   ├── main.js              # menu principal
│   │   ├── create.js            # criação de tarefas
│   │   ├── listTask.js          # lista de tarefas
│   │   └── update.js            # detalhes, edição e remoção
│   ├── manager
│   │   └── tasksManagerPg.js    # regras de dados e consultas ao PostgreSQL
│   └── database
│       └── database.js          # conexão (pool) com o banco
├── sql
│   └── schema.sql               # criação da tabela tasks
├── docker-compose.yml           # banco PostgreSQL em container
├── .env.example                 # modelo das variáveis de ambiente
└── package.json
```

Os menus cuidam apenas da interação com o usuário. As regras de dados (criar, buscar, renomear, mudar o status, remover e listar) ficam no `tasksManagerPg`, que é quem executa as consultas SQL. A conexão com o banco é criada uma única vez em `database.js` e fechada no fim do programa, em `index.js`.

## Formato dos dados

As tarefas ficam na tabela `tasks`:

| Coluna       | Tipo          | Descrição                                              |
| ------------ | ------------- | ------------------------------------------------------ |
| `id`         | `uuid`        | Chave primária, gerada pelo banco                      |
| `name`       | `text`        | Nome da tarefa (obrigatório)                           |
| `status`     | `text`        | Status da tarefa. Padrão: `Em andamento`               |
| `created_at` | `timestamptz` | Data e hora de criação, preenchida pelo banco          |

O `id` é um UUID gerado pelo banco na criação (`gen_random_uuid()`) e nunca muda, mesmo que o nome seja alterado. O status inicial e a data de criação também vêm de valores padrão da própria tabela, então o programa só informa o nome ao criar uma tarefa.

Nos objetos do código, as tarefas têm os mesmos nomes das colunas, por exemplo:

```js
{
  id: "3b241101-e2bb-4255-8caf-4136c566a962",
  name: "Estudar Node",
  status: "Em andamento",
  created_at: 2026-10-06T12:00:00.000Z
}
```

## Melhorias

Em relação ao projeto que serviu de inspiração, este repositório inclui:

- Identificador único (UUID) por tarefa, em vez de usar o nome como chave
- Armazenamento em **PostgreSQL**, no lugar de um arquivo JSON, com consultas parametrizadas
- **Docker Compose** para subir o banco, com a tabela criada automaticamente e os dados guardados em um volume
- Configuração da conexão por variáveis de ambiente, com um `.env.example` como modelo
- Validação de nome vazio ou só com espaços
- Navegação feita com laços e `await`, sem funções que chamam umas às outras
- Separação entre a interface (menus) e as regras de dados (`tasksManagerPg`)

## Próximos passos

- Prazo e prioridade nas tarefas, com filtros e busca

## Créditos

Inspirado no curso de JavaScript do canal [Rincko Dev](https://www.youtube.com/@rinckodev). A estrutura inicial do projeto, com os dados em arquivo JSON, segue a apresentada no curso. A migração para PostgreSQL, o Docker Compose e o restante foram adaptados e ampliados.