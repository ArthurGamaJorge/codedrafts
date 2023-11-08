<h1>Code Drafts</h1>
Acesse o site em: <a href="https://codedrafts-5as0.onrender.com/"  target="_blank" >CodeDrafts</a>

Trabalho de Práticas Profissionais II

* Arthur Gama Jorge                    - RA: 23578  - 1o Info
* Daniel Dorigan de Carvalho Campos    - RA: 23124  - 1o Info
* Ion Mateus Nunes Oprea               - RA: 23135  - 1o Info


<h2>Dependências do projeto para execução local:</h2>
<h3>Web</h3>
Clonar o repositório com:

```console
 git clone https://github.com/cc23135/codedrafts.git
```

Abrir o projeto criado e no terminal digitar os seguintes comandos

```console
cd src
```

```console
npm init -y
```

```console
npm install express --save
```

```console
npm i express body-parser multer
```

```console
npm i @google-cloud/storage
```

```console
npm install prisma --save-dev
```

```console
npm prisma init
```

Criar arquivo .env na pasta src e inserir conexão ao banco de dados como no exemplo abaixo:
```console
DATABASE_URL="sqlserver://regulus.cotuca.unicamp.br:1433;database=BDxxxxx;user=BDxxxxx;password=xxxxx;encrypt=true;trustServerCertificate=true;schema=CodeDrafts"
```

```console
npm install @prisma/client
```

```console
npx prisma generate
```

Sempre que quiser visualizar o site, execute o comando
```console
node app
```
Abra seu browser e digite <b> localhost:3000 </b> 
