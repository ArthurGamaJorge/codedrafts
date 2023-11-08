<h1>Code Drafts</h1>
Acesse o site em: <a href="https://codedrafts-5as0.onrender.com/"  target="_blank" >https://codedrafts-5as0.onrender.com</a>

Trabalho de Práticas Profissionais II

* Arthur Gama Jorge                    - RA: 23578  - 1o Info
* Daniel Dorigan de Carvalho Campos    - RA: 23124  - 1o Info
* Ion Mateus Nunes Oprea               - RA: 23135  - 1o Info


<h2>Dependências do projeto para execução local:</h2>

Clonar o repositório com:

```console
 git clone https://github.com/cc23135/codedrafts.git
```

<h3>Java (VSCODE)</h3>
Instalar o <a href="https://openjfx.io/"> JavaFx SDK</a> (link alternativo: <a href="https://jdk.java.net/javafx21/"> JavaFx21</a>) <br>
ir na pasta .vscode e criar um arquivo nela chamado <i>launch.json</i>
nesse arquivo colocar o seguinte código: <br><br>

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "java",
            "name": "Java/App",
            "request": "launch",
            "mainClass": "App",
            "vmArgs": "--module-path 'Diretório/para/javafx/lib' --add-modules javafx.controls,javafx.fxml"
        }
    ]
}
```

Exemplo de vmArgs:
```json
 "vmArgs": "--module-path 'C:/Users/arthu/Downloads/openjfx-21.0.1_windows-x64_bin-sdk/javafx-sdk-21.0.1/lib' --add-modules javafx.controls,javafx.fxml"
```
Ir na pasta src localizada dentro da pasta java e criar um arquivo txt chamado "ConnectionString.txt" <br><br>
Dentro desse arquivo txt colocar sua string de conexão, como por exemplo: <br><br>
jdbc:sqlserver://<ENDEREÇO DO SERVIDOR>:1433;database=<NOME DO SEU DATABASE>;user=<NOME DO SEU USUÁRIO>;password=<SUA SENHA>;encrypt=true;trustServerCertificate=true;schema=CodeDrafts"

<br><br>
<h3>Web</h3>
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
npm install cors
```

```console
npm i --save-dev @types/cors
```

```console
npm install prisma --save-dev
```

```console
npm prisma init
```

Criar arquivo .env na pasta src e inserir conexão ao banco de dados como no exemplo abaixo:
```console
DATABASE_URL="sqlserver://<ENDEREÇO DO SERVIDOR>:1433;database=<NOME DO SEU DATABASE>;user=<NOME DO SEU USUÁRIO>;password=<SUA SENHA>;encrypt=true;trustServerCertificate=true;schema=CodeDrafts"
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
