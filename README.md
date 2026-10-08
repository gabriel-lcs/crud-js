# Lista de Tarefas (CLI)

Projeto simples de lista de tarefas para o terminal, desenvolvido apenas com **JavaScript** e **Node.js**. Os dados são guardados em um arquivo JSON, e a navegação é feita pelo teclado, com as setas.

Foi inspirado no curso de JavaScript do canal [Rincko Dev](https://www.youtube.com/@rinckodev), mas recebeu melhorias e adaptações próprias (veja a seção [Melhorias](#melhorias)).

> Esta é a versão com **JSON** (`v1.0-json`). A versão com PostgreSQL e Docker está em desenvolvimento.

## Funcionalidades

- Criar tarefas
- Listar tarefas, com o status de cada uma
- Ver os detalhes de uma tarefa (nome, status e data de criação)
- Alterar o nome de uma tarefa
- Alterar o status: **Em andamento**, **Concluído** ou **Cancelado**
- Deletar tarefas
- Os dados continuam salvos depois de fechar o programa

## Tecnologias

- [Node.js](https://nodejs.org/) (módulos ES)
- [@clack/prompts](https://github.com/bombshell-dev/clack) para os menus interativos no terminal
- Módulos nativos do Node: `fs`, `path` e `crypto`

## Como executar

Pré-requisito: **Node.js 20.12 ou superior**.

```bash
git clone <url-do-repositorio>
cd <pasta-do-projeto>
npm install
npm start
```

Rode os comandos sempre a partir da **raiz do projeto**: o programa procura o `tasks.json` na pasta em que o comando é executado. Se o arquivo não existir, ele é criado automaticamente na primeira execução.

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
│   └── manager
│       └── tasksManager.js      # regras de dados e leitura/gravação do JSON
├── tasks.json                   # armazenamento das tarefas
└── package.json
```

Os menus cuidam apenas da interação com o usuário. Toda a regra de dados (criar, buscar, renomear, mudar o status, remover e salvar) fica no `tasksManager`, que é o único arquivo que conhece o formato de armazenamento.

## Formato dos dados

Cada tarefa é um objeto no `tasks.json`:

```json
{
  "id": "3b241101-e2bb-4255-8caf-4136c566a962",
  "name": "Estudar Node",
  "status": "Em andamento",
  "created_at": "2026-10-06T12:00:00.000Z"
}
```

O `id` é um UUID gerado na criação e nunca muda, mesmo que o nome seja alterado.

## Melhorias

Em relação ao projeto que serviu de inspiração, este repositório inclui:

- Identificador único (UUID) por tarefa, em vez de usar o nome como chave
- Validação de nome vazio ou só com espaços
- Navegação feita com laços e `await`, sem funções que chamam umas às outras
- Separação entre a interface (menus) e as regras de dados (`tasksManager`)

## Próximos passos

- Integração com **PostgreSQL**
- Subir o banco com **Docker Compose**
- Prazo e prioridade nas tarefas, com filtros e busca
- Testes automatizados

## Créditos

Inspirado no curso de JavaScript do canal [Rincko Dev](https://www.youtube.com/@rinckodev). A abordagem de leitura e gravação do arquivo JSON segue a apresentada no curso, e o restante foi adaptado e ampliado.