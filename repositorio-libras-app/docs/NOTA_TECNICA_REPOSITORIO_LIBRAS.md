[‹ Voltar ao README](../../README.md)

Informações de implantação, compatibilidade e configurações do Repositório de Libras.

 - [1. Pré-Requisitos](#pré-requisitos)
 - [2. Dependências](#dependências)
 - [3. Versões Compatíveis](#versões-compatíveis)
 - [4. Variáveis de Ambiente](#variáveis-de-ambiente)
 - [5. Propriedades e Serviços no Firebase](#propriedades-e-serviços-no-firebase)


### Pré-Requisitos
Para rodar o projeto, você deve ter instalado:
 - Node.js (versão mínima `14.x`)
 - Firebase


### Dependências
 O Repositório de Libras possui *dependências* com as ferramentas que estão listadas abaixo:
 
  - CoreJS
  - Firebase
  - Vue
  - VueRouter
  - VueSvgLoader
  - Vuex
 

 ### Versões Compatíveis

As versões dos frameworks utilizados, estão listadas abaixo na tabela:

| Nome | Versão |
| --- | --- |
| CoreJS | 3.6.5 |
| Firebase | 8.7.1 |
| Vue | 2.6.11 |
| VueRouter| 3.2.0 |
| VueSvgLoader | 0.16.0 |
| Vuex | 3.4.0 |

### Variáveis de Ambiente
No momento não há variáveis de ambiente existentes no projeto.

### Propriedades e Serviços no Firebase
A seguir são listadas as propriedades utilizadas para configurar o Repositório de Libras:

#### Functions

| Function     | Trigger      | Runtime    |
|--------------|--------------|------------|
| addAdminRole | HTTP Request | Node.js 16 |

Observação: lembre-se sempre de fazer o deploy do firebase no projeto, depois que incluir todas as propriedades e serviços.

[‹ Voltar ao README](../../README.md)