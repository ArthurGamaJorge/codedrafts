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

app.post("/postsUser", async(req, res) =>{
  const posts = await prisma.$queryRaw
  `select * from CodeDrafts.V_PreviewPost where idUsuario = ${req.body.idUsuario} order by pontosPost DESC`;
  res.json(posts)
})

app.post("/searchposts", async(req, res) =>{
  const posts = await prisma.$queryRaw
  `select * from CodeDrafts.V_PreviewPost WHERE CHARINDEX(${req.body.content}, titulo, 0) > 0 OR CHARINDEX(${req.body.content}, conteudo, 0) > 0 order by pontosPost DESC`;
  res.json(posts)
})

app.get("/filters", async(req, res) =>{
  const filters = await prisma.$queryRaw
  `select * from CodeDrafts.Topico order by nome DESC`;
  res.json(filters)
})

app.post("/conquistas", async(req, res) =>{
  const conquistas = await prisma.$queryRaw
  `select C.nome, C.nivel, C.imagem from CodeDrafts.V_ConquistasUser C, CodeDrafts.Usuario where idUsuario = ${req.body.idUsuario} order by nivel DESC`
  res.json(conquistas)
})

app.get("/ranks", async(req, res) =>{
  const ranks = await prisma.$queryRaw
  `select * from CodeDrafts.V_Ranking order by pontosTotais DESC`;
  res.json(ranks)
})

// CONFIGURATIONS

app.post("/atualizarUsuario", async(req, res) =>{
    const u = await prisma.usuario.findFirst({
        where: {
            AND: [{email: req.body.emailAntigo}, {senha: req.body.senhaAntiga}]
        }
    })
    try{
    await prisma.$queryRaw 
    `exec CodeDrafts.spAtualizarUsuario ${u.idUsuario}, ${req.body.nome}, ${req.body.username}, 
    ${u.descricao}, ${req.body.fotoPerfil}, ${req.body.senha}, ${u.pontosTotais}, ${u.ativo}, ${u.quantidadeDenuncias}, ${req.body.email}`;
    res.json({resposta: "Sucesso"})
  } catch{
    res.json({resposta: "Unique"})
  }
  })

app.post("/signup", async(req, res) =>{
  try{
     const cadastro = await prisma.$queryRaw
    `exec CodeDrafts.spInserirUsuario ${req.body.name}, ${req.body.username}, ${req.body.password}, ${req.body.email}`;
    res.json({resposta: "Sucesso"})
  } catch{
    res.json({resposta: "Unique"})
  }
  })

// INTERAÇÕES

app.post("/jareportou", async(req, res) =>{
  const report = await prisma.$queryRaw
  `select * from CodeDrafts.UsuarioPost where idUsuario = ${req.body.idUsuario} and idPost = ${req.body.idPost} and denunciado = 1`;
  if(report != ''){
    res.json({resposta: "True", idPost: req.body.idPost})
  } 
  else{
    if(req.body.reportar != false){
      res.json({resposta: "False"})
      const existeTabela = await prisma.$queryRaw
      `select * from CodeDrafts.UsuarioPost where idUsuario = ${req.body.idUsuario} and idPost = ${req.body.idPost}`;

      if(report == ''){
        await prisma.$queryRaw
        `exec CodeDrafts.spInserirUsuarioPost ${req.body.idUsuario}, ${req.body.idPost}, 1, 0`;
      } 
      else{
        await prisma.$queryRaw
        `exec CodeDrafts.spAtualizarUsuarioPost ${existeTabela.idUsuarioPost}, ${req.body.idPost}, 1, ${existeTabela.curtido}`;
      }}
    else{
      res.json({resposta: "False", idPost: req.body.idPost})
    }}
  })
