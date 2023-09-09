# SpaceX API Challenge

Este repositório contém o backend da minha solução para o desafio Fullstack SpaceX API. Desenvolvi uma aplicação web que consome a API da SpaceX para listar informações sobre os lançamentos de foguetes da SpaceX e apresentar essas informações de maneira visualmente atraente. Instruções podem ser vistas em [README](instrucoes/README.md).

## Back-End

### Tecnologias Utilizadas
- Node.js para criar a API Restful
- MongoDB para armazenar os dados dos lançamentos
- Cron para agendamento de tarefas diárias de sincronização de lançamentos
- Swagger para documentação da API
- Docker e Docker-Compose para facilitar o deploy
- Testes unitários com Jest

### Como instalar e executar o projeto

Necessário que docker e docker-compose estajam instalados e rodando.

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/spacex-api-challenge.git
```

2. Navegue para o diretório do projeto:
```bash
cd pasta/de/destino/do/projeto
```

3. Inicie os containers
```bash
docker-compose build
docker-compose up
```

4. Ao finalizar, 3 containers devem estar em execução:
- Mongo - Container contendo o banco de dados mongodb, que servirá de base de dados para a aplicação. O banco estará em execução em mongo://localhost:27017.
- cron - Container contendo o agendamento de tarefas diárias. Com uma tarefa agendada para as 9hrs de sicronização de lançamentos
- server - Container contendo a API Restful. O servidor estará em execução em http://localhost:5000.

### Aplicação

O projeto foi executado em Typescript. O Typescript traz benefícios como detecção de erros de tipo em tempo de compilação tornando o desenvolvimento de aplicativos JavaScript mais seguros e escaláveis. Portanto, antes de executarmos os arquivos, devemos compilar.

O projeto possui a seguinte estrutura organizada:

**Batch:** Esta camada é responsável pela execução de tarefas em lote ou em segundo plano. É fica os processos automatizados, como a sincronização diária dos lançamentos da SpaceX.

**Business:** Esta camada contém a lógica de negócios principal da aplicação. Aqui, as regras de negócios são implementadas e os processos de negócios são definidos.

**Config:** A camada de configuração armazena todas as configurações da aplicação, como variáveis de ambiente, configurações de banco de dados, configurações de autenticação, etc.

**Contract:** Nesta camada, são definidos os contratos ou interfaces que descrevem como as diferentes partes da aplicação interagem entre si.

**Controller:** Os controladores são responsáveis por receber as solicitações HTTP, interagir com os serviços e retornar as respostas apropriadas para o cliente. Eles atuam como intermediários entre as rotas da API e os serviços.

**Model:** A camada de modelo define a estrutura dos dados da aplicação. Isso inclui a definição de modelos de banco de dados, esquemas de dados, classes de entidade, etc.

**Repository:** A camada de repositório lida com a interação direta com o banco de dados. Ela contém consultas e operações relacionadas ao banco de dados para buscar, salvar, atualizar e excluir dados.

**Service:** Os serviços representam funcionalidades externas a aplicação que serão usadas em algum momento, por exemplo, chamadas HTTP.

Essa estrutura ajuda a manter a aplicação organizada, modular e facilita a manutenção, escalabilidade e testabilidade do código. Cada camada tem uma responsabilidade claramente definida, o que torna o desenvolvimento mais eficiente e gerenciável.
Para um baixo acoplamento foi usada uma arquitetura de inversão de controle e injeção de dependência com o auxílio da biblioteca **tsyringe**.

O arquivo app.js é usado para configurar, definir rotas e iniciar o servidor da aplicação.

O arquivo runBatch.js é usado para executar tarefas em lote e processos automatizados em segundo plano, neste a sincronização dos lançamentos da SpaceX.

Para iniciar a API, execute:

```
node dist/app.js
```

Para executar a sincronização dos dados, execute o comando abaixo quando quiser:

```
node dist/runBath.js
```

### CRON

A tarefa é agendada pelo seguinte código:

`00 09 * * * root chmod +x /home/app/scripts -R && /home/app/scripts/runBatch.sh >> /var/log/cron.log 2>&1`

`00 09 * * *` : Esta parte especifica a programação de quando o comando deve ser executado. Neste caso, "00" significa que o comando será executado quando os minutos forem "00", "09" significa que o comando será executado às 9 horas da manhã. Os asteriscos (*) indicam que o comando será executado todos os dias do mês e em todos os meses do ano, independentemente do dia da semana.

`root` : Indica o usuário que executará o comando. Neste caso, o comando será executado como o usuário "root", que geralmente tem permissões administrativas no sistema.

`chmod +x /home/app/scripts -R` : Este comando é executado antes do script ser executado e está definindo permissões de execução recursivas para todos os arquivos no diretório /home/app/scripts. Isso garante que todos os scripts dentro desse diretório tenham permissão para serem executados.

`/home/app/scripts/runBatch.sh` : Esta é a parte principal do comando que especifica qual script será executado. Neste caso, o script runBatch.sh localizado no diretório /home/app/scripts será executado.

`>> /var/log/cron.log 2>&1` : Isso redireciona a saída padrão (stdout) do script para o arquivo /var/log/cron.log e redireciona os erros padrão (stderr) para a saída padrão (stdout). Isso permite que registre a saída do script e os erros em um arquivo de log.

O script runBatch.sh executa a rotina node:
```
node /home/app/dist/runBatch.js
```
### Teste

O projeto inclui testes unitários para as rotas da API. Você pode executar os testes usando o seguinte comando na pasta do servidor:

```bash
npm run test
```