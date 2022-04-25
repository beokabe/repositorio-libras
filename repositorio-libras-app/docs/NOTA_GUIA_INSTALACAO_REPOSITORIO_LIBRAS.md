[‹ Voltar ao README](../../README.md)

# Guia de Instalação para Desenvolvimento

#### Observação: 
Antes de seguir esses passos, tenha em mente que a sua máquina necessita ter o `node.js (v14.19.1)`, `npm (v.6.14.16)` instalados previamente. Para controle de versões do node, recomendamos a instação do `nvm`.
# 
#### 1. Clone ou faça download do projeto;
#### 2. Instale todas as dependências do projeto:
```shell
npm install
```
#### 3. Tenha uma conta no Firebase e crie um projeto para o Repositório de Libras;

#### 4. Abra o projeto na IDE e localize a pasta `firebase` em `src`, em seguida abra o arquivo `firebaseInit.js` e coloque a configuração do seu projeto firebase neste a arquivo;

#### 5. No projeto criado, dê um upgrade na conta do Firebase no módulo "Functions";

#### 6. Na raíz do projeto, execute os seguintes scripts do terminal:
```
npm install -g firebase-tools
firebase login
```

#### 7. Instale os módulos do Firebase no seu projeto:
```
firebase init
```
#### Aceite qualquer configuração padrão e adicione as seguintes funcionalidades: Firestore, Functions e Storage.

#### 8. Faça o deploy das funções do projeto que estão localizadas na pasta "functions" na raíz do projeto:
```
firebase deploy --only functions
```
Observação: antes de fazer o deploy, confira se as propriedades e serviços do Firebase estão incluídas no seu projeto Firebase, caso não estiver, inclua e confira se tudo está inserido corretamente utilizando a [nota técnica](./NOTA_TECNICA_REPOSITORIO_LIBRAS.md).

#### 9. Vá no seu projeto Firebase, Storage e depois em Rules.
```JSON
1
rules_version = '2';
2
service firebase.storage {
3
  match /b/{bucket}/o {
4
    match /{allPaths=**} {
5
      allow read, write: if false;
6
    }
7
  }
8
}
```

Libere as permissões para leitura e escrita em todos os caminhos da Storage do projeto firebase, mudando o valor `false` da condição para `true`.

#

[‹ Voltar ao README](../../README.md)

