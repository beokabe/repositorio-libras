[‹ Voltar ao README](../../README.md)

# Nota de Manutenção

Informações sobre logs da aplicação e ferramentas que auxiliarão na manutenção do projeto.

## Ferramentas Úteis

### Ambiente de Desenvolvimento
**Vue Devtools**: é um ferramenta para aplicações Vue.js que pode ser usada para debuggar o código (Veja para [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) ou para [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)).

**Logs do Firebase**: o projeto está utilizando Firebase para consumir serviços e armazenar dados no Firestore, logo é possível visualizar as logs dos serviços da aplicação que estão sendo consumidos. Confira essas informações no seu projeto do Firebase.

### Banco de Dados e Serviços Firebase
**Authentication**: para acessar o banco de dados com as informações de autenticação dos usuários, acesse o projeto Firebase e vá na seção `Authentication`. 

**Firestore**: para acessar o banco de dados, acesse o Firebase do projeto e vá na seção `Storage`.

**Functions**: para acessar todos os serviços consumidos no Firebase, acesse a seção `Functions`.

### Ferramentas de Planejamento

### Trello

Ferramenta utilizada para gerenciar o planejamento do Repositório de Libras.
Veja com o criador do projeto para poder ter acesso: [Quadro Trello do Repositório de Libras.](https://trello.com/b/pA5aeP5T/reposit%C3%B3rio-de-libras)

## Liberação
### Liberação de Versão


Ao liberar uma versão você deverá seguir o seguinte roteiro:

1. Verificar se a nota de release do projeto está pronta;
2. Documentar a nota de release no projeto no arquivo CHANGELOG.md;
3. Será necessário criar uma nota técnica se houver: Adição de novas funcionalidades; Criação de permissões; Integrações com Novos Sistemas;
Atualizações de Aplicações Externas;
4. A nota técnica deve ser atualizada [neste documento](./NOTA_TECNICA_REPOSITORIO_LIBRAS.md);
5. Altere a versão do projeto;
6. Atualize a branch `master` no repositório do projeto.

[‹ Voltar ao README](../../README.md)