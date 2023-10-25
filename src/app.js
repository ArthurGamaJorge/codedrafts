// Configurando o prisma
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Configurando o express para usar o protocólo http
const express = require('express')
const app = express()

const route = require('./routes/route')

// Nescessários para utilizar da API do google cloud storage
const {Storage} = require('@google-cloud/storage')
const Multer = require('multer')

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limita o tamanho da imagem para 5 megas
  },
})
const storage = new Storage({
  projectId: "codedrafts-401521",
  keyFilename: "keys.json"
})
const bucket = storage.bucket('imagesdrafts')

app.post("/upload", multer.single('imgfile'), (req,res) =>{
  try{
    if(req.file){
      const blob = bucket.file(req.file.originalname)
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () =>{
        res.status(200).send("Imagem enviada")
        console.log("Enviado")
      })
      blobStream.end(req.file.buffer)
    } else throw "Erro ao enviar mensagem"
  } catch(error){
    res.status(400).send(error)
  }
})

// Decode e uncode de json para objeto e objeto para json
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', route)

// Node escuta requisições da porta 3000
app.listen(3000, () =>{
    console.log("Servidor Projeto Node com SQLServer")
})

var path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

// COLOCAR ARQUIVOS HTML
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'));
})
app.get("/app.html", function(req, res){
    res.sendFile(path.join(__dirname, '../app.html'));
})
app.get("/configurations.html", function(req, res){
    res.sendFile(path.join(__dirname, '../configurations.html'));
})
app.get("/user.html", function(req, res){
    res.sendFile(path.join(__dirname, '../user.html'));
})

// APP

// VERIFICAR LOGIN USUÁRIO
app.post("/verificarUsuario", async(req, res) =>{
    const users = await prisma.Usuario.findFirst({
        where: {
            AND: [{email: req.body.email}, {senha: req.body.senha}]
        }
    })
    res.json(users)
})

app.get("/posts", async(req, res) =>{
    const posts = await prisma.$queryRaw
    `select * from CodeDrafts.V_PreviewPost order by pontosPost DESC`;
    res.json(posts)
})

app.get("/ranks", async(req, res) =>{
  const ranks = await prisma.$queryRaw
  `select * from CodeDrafts.V_Ranking`;
  res.json(ranks)
})

// CONFIGURATIONS

app.post("/atualizarUsuario", async(req, res) =>{
    const u = await prisma.usuario.findFirst({
        where: {
            AND: [{email: req.body.emailAntigo}, {senha: req.body.senhaAntiga}]
        }
    })
    await prisma.$queryRaw 
    `exec CodeDrafts.spAtualizarUsuario ${u.idUsuario}, ${req.body.nome}, ${req.body.username}, 
    ${u.descricao}, ${req.body.fotoPerfil}, ${req.body.senha}, ${u.pontosTotais}, ${u.ativo}, ${u.quantidadeDenuncias}, ${req.body.email}`;
})