<h1>CodeDrafts</h1>
Acesse o site em: <a href="https://codedrafts-5as0.onrender.com/"  target="_blank" >https://codedrafts-5as0.onrender.com</a>
Código no GitHub: <a href="https://github.com/ArthurGamaJorge/codedrafts/"  target="_blank" >https://github.com/ArthurGamaJorge/codedrafts/</a>

Trabalho de Práticas Profissionais II

* Arthur Gama Jorge                    - RA: 23578  - 1o Info
* Daniel Dorigan de Carvalho Campos    - RA: 23124  - 1o Info
* Ion Mateus Nunes Oprea               - RA: 23135  - 1o Info
<br>
<p>Web</p>
<img src= "https://github.com/ArthurGamaJorge/codedrafts/assets/129080603/1b5e321a-80d0-40e2-bfc2-b371173a1132">
<img src = "https://github.com/ArthurGamaJorge/codedrafts/assets/129080603/81007d6d-6812-4fbc-aa45-8876cb2f0240"> <br><br>

<div style="display: flex">
<img src= "https://github.com/ArthurGamaJorge/codedrafts/assets/129080603/b535147c-4192-4076-bcbe-8eb6b0a7ca3c" width=75%>
<img src = "https://github.com/ArthurGamaJorge/codedrafts/assets/129080603/bb91c9af-f3a5-4d81-85be-d36c027b5d09" width=20%>
</div> <br><br>

<p>Java</p>
<div style="display: flex">
<img src = "https://github.com/ArthurGamaJorge/codedrafts/assets/129080603/6adf92ff-35a9-46bd-b4ee-79b1a9d8cf61" width=34%>
<img src = "https://github.com/ArthurGamaJorge/codedrafts/assets/129080603/eb814623-89fd-42ba-bde7-910d35c19726" width=61%>
</div> <br><br>

<h2>Dependências do projeto para execução local:</h2>

Clonar o repositório com:

```console
 git clone https://github.com/cc23135/codedrafts.git
```

<h3>Java (VSCODE)</h3>
Instalar o <a href="https://openjfx.io/"> JavaFx SDK</a> (link alternativo: <a href="https://jdk.java.net/javafx21/"> JavaFx21</a>) e <a href="https://www.oracle.com/br/database/technologies/appdev/jdbc-downloads.html"> JDBC Driver </a> <br>
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
npm install prisma --save-dev
```

```console
npm install @prisma/client
```

Criar arquivo .env na pasta src e inserir conexão ao banco de dados como no exemplo abaixo:
```console
DATABASE_URL="sqlserver://<ENDEREÇO DO SERVIDOR>:1433;database=<NOME DO SEU DATABASE>;user=<NOME DO SEU USUÁRIO>;password=<SUA SENHA>;encrypt=true;trustServerCertificate=true;schema=CodeDrafts"
```

```console
npm prisma init
```

```console
npx prisma db pull
```

```console
npx prisma generate
```

Sempre que quiser visualizar o site, execute o comando
```console
node app
```
Abra seu browser e digite <b> localhost:3000 </b> 
