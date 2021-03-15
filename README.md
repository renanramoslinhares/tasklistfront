# TaskList - Front
## Feito com Vue e Vuetify

## Sobre
Este projeto é parte de um desafio. Composto por:
- Este frontend;
- E a API. Que se encontra neste repositório: `https://github.com/renanramoslinhares/tasklistjavaapi`;

## Como utilizar  
Acesse o endereço `https://tasklistfront.herokuapp.com/`.
  
  ### Criar nova tarefa
  Ao clicar no botão "mais"(+) é exibido um pequeno modal. Insira o título e salve.
  A lista será atualizada.
  
  ### Campo de Busca
  O campo de pesquisa filtra apenas as tarefas que tem em seu título e/ou descrição o termo buscado.
  
  ### Lista de tarefas
  Será exibida uma lista com totas as tarefas criadas - concluídas ou não - com exceção das já deletadas.
  Você pode marcar/desmarcar o checklist para atualizar o status da tarefa.
  Outra opção é clicar no botão "editar"(Lápis) para abrir o componente de edição da tarefa.
  
  ### Editar tarefa
  Nesta tela é possível alterar:
  - Status
  - Título
  - Descrição
  - Deletar a tarefa

  Além de ser possível visualizar a data da última alteração.
  
## Instalar e rodar localmente
Você deve ter Node, NPM e Git instalado.
Escolha uma pasta de sua preferência e abra no terminal de comando:
  #### Clone o repositório
    git clone https://github.com/renanramoslinhares/tasklistfront.git && cd tasklistfront/
    
  #### Instale as dependências
    npm install
    
  #### Compila para desenvolvimento e inicia servidor local
    npm run serve
  
