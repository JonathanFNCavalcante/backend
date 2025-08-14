# Construção de Backend

Repositório criado para as aulas teóricas e atividades práticas da disciplina.

## Organização do Repositório

Este repositório está organizado da seguinte forma:
- **aulas/**: Pasta que contém os códigos das aulas teóricas.
- **praticas/**: Pasta que contém os códigos das atividades práticas.

## Comandos Básicos do NPM

Aqui estão alguns comandos básicos do NPM (Node Package Manager) que podem ser úteis durante o desenvolvimento de APIs.

1. Criar um projeto Node.js
```shell
npm init -y
```
2. Instalar pacotes
```shell
# instala para uso em produção 
npm install nome-do-pacote            
# instala como dependência de desenvolvimento
npm install --save-dev nome-do-pacote 
```
3. Desinstalar pacotes
```shell
npm uninstall nome-do-pacote
```
4. Executar scripts definidos no package.json
```shell
npm run nome-do-script
```
5. Criar um projeto base de API com Express Generator
```shell
npx express-generator --no-view nome-do-projeto
```
6. Iniciar o servidor de desenvolvimento com Nodemon
```shell
npm run dev
```
7. Executar testes unitários com Jest
```shell
npm run test
```
