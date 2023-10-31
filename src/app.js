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

app.post("/postsUser", async(req, res) =>{
  const posts = await prisma.$queryRaw
  `select * from CodeDrafts.V_PreviewPost where idUsuario = ${req.body.idUsuario} order by pontosPost DESC`;
  res.json(posts)
})

app.post("/searchposts", async(req, res) =>{
  if(req.body.tópicos != ''){
    posts = await prisma.$queryRaw
    `select * from CodeDrafts.V_PreviewPost WHERE (CHARINDEX(${req.body.content}, titulo, 0) > 0 OR CHARINDEX(${req.body.content}, conteudo, 0) > 0) 
    AND CHARINDEX(${req.body.tópicos}, tópicos, 0) > 0 order by pontosPost DESC`;
  } else{
    posts = await prisma.$queryRaw
    `select * from CodeDrafts.V_PreviewPost WHERE CHARINDEX(${req.body.content}, titulo, 0) > 0 OR CHARINDEX(${req.body.content}, conteudo, 0) > 0 order by pontosPost DESC`;
  }
  res.json(posts)
})

app.get("/filters", async(req, res) =>{
  const filters = await prisma.$queryRaw
  `select * from CodeDrafts.Topico`;
  res.json(filters)
})

app.post("/conquistas", async(req, res) =>{
  const conquistas = await prisma.$queryRaw
  `select nome, nivel, imagem from CodeDrafts.V_ConquistasUser C where C.idUsuario = ${req.body.idUsuario} order by nivel DESC`
  res.json(conquistas)
})

app.get("/ranks", async(req, res) =>{
  const ranks = await prisma.$queryRaw
  `select * from CodeDrafts.V_Ranking order by pontosTotais DESC, nome`;
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
        `exec CodeDrafts.spInserirUsuarioPost ${req.body.idUsuario}, ${req.body.idPost}, 1, null`}
      else{
        await prisma.$queryRaw
        `exec CodeDrafts.spAtualizarUsuarioPost ${existeTabela.idUsuarioPost}, ${req.body.idPost}, 1, ${existeTabela.curtido}`;
        await prisma.$queryRaw
        `UPDATE CodeDrafts.Post set quantidadeDenuncias += 1 where idPost = ${req.body.idPost}`;
      }}
    else{
      res.json({resposta: "False", idPost: req.body.idPost})
    }}
  })


    app.post("/curtidas", async(req, res) =>{

      const existeTabela = await prisma.$queryRaw
          `select * from CodeDrafts.UsuarioPost where idUsuario = ${req.body.idUsuario} and idPost = ${req.body.idPost} and curtido is not null`;
      
      if(req.body.ação == "verificar"){
        if(existeTabela != ""){
          res.json(existeTabela)
          return
        }
        res.json({resposta: ""})
        return
      }
      const existeInteração = await prisma.$queryRaw
          `select * from CodeDrafts.UsuarioPost where idUsuario = ${req.body.idUsuario} and idPost = ${req.body.idPost}`;
      if(existeInteração != ""){
        mudança = 1
        if(req.body.ação == "descurtir"){
          await prisma.$queryRaw
          `exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${req.body.idPost}, ${existeInteração[0].denunciado}, 0`
          
          if(existeInteração[0].curtido == 1){mudança = 2}
            await prisma.$queryRaw
          `UPDATE CodeDrafts.Post set pontosPost -= ${mudança} where idPost = ${req.body.idPost}`;
          await prisma.$queryRaw
          `UPDATE CodeDrafts.Usuario set pontosTotais -= ${mudança} where idUsuario = ${req.body.idUsuario}`;
        
        } 
        if(req.body.ação == "tirarDescurtida"){
          await prisma.$queryRaw
          `exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${req.body.idPost}, ${existeInteração[0].denunciado}, null`
          await prisma.$queryRaw
          `UPDATE CodeDrafts.Post set pontosPost += 1 where idPost = ${req.body.idPost}`;
        }

        if(req.body.ação == "curtir"){
          await prisma.$queryRaw
          `exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${req.body.idPost}, ${existeInteração[0].denunciado}, 1`
          
          if(existeInteração[0].curtido == 0){mudança = 2}
          await prisma.$queryRaw
        `UPDATE CodeDrafts.Post set pontosPost += ${mudança} where idPost = ${req.body.idPost}`;
        await prisma.$queryRaw
        `UPDATE CodeDrafts.Usuario set pontosTotais += ${mudança} where idUsuario = ${req.body.idUsuario}`;

        } 
        if(req.body.ação == "tirarCurtida"){
          await prisma.$queryRaw
          `exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${req.body.idPost}, ${existeInteração[0].denunciado}, null`
          await prisma.$queryRaw
          `UPDATE CodeDrafts.Post set pontosPost -= 1 where idPost = ${req.body.idPost}`;
          await prisma.$queryRaw
          `UPDATE CodeDrafts.Usuario set pontosTotais -= 1 where idUsuario = ${req.body.idUsuario}`;
      }
    } else{
      opção = -1
      if(req.body.ação == "descurtir"){
        opção = 0
      } 
      if(req.body.ação == "tirarDescurtida"){
        opção = null
      }

      if(req.body.ação == "curtir"){
        opção = 1
      } 
      if(req.body.ação == "tirarCurtida"){
        opção = null
      }
      await prisma.$queryRaw
      `exec CodeDrafts.spInserirUsuarioPost ${req.body.idUsuario}, ${req.body.idPost}, 0, ${opção}`
    }

      res.json({resposta: ""})})



app.get('/user/*', async (req, res) => {
  const urlString = req.url;
  const urlAsString = urlString.toString();
  const usernameV = urlAsString.split("/");
  const username = usernameV[2];

  const search = await prisma.$queryRaw `select * from CodeDrafts.Usuario where username=${username}`;

  if (search != "") {
    result = search[0]
    res.send(createUserPage(result))

  } else {
    res.send(`
      <br><br>
      <h1 style="font-size:70px;text-align:center">Usuário não encontrado.</h1>
      `);
  }
});


app.get('/post/*', async (req, res) => {
  const urlString = req.url;
  const urlAsString = urlString.toString();
  const idV = urlAsString.split("/");
  const idPost = parseInt(idV[2]);


  const search = await prisma.$queryRaw `select * from CodeDrafts.Post where idPost=${idPost}`;

  if (search != "") {
    result = search[0]
    res.send(`
      <h1>${result.titulo}</h1>
      <img style="width:300px;height:300px;border:3px solid black" src="${result.capa}">
    `)
  } else {
    res.send(`
      <br><br>
      <h1 style="font-size:70px;text-align:center">Post não encontrado.</h1>
      `);
  }
});























function createUserPage(data){
  return `


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../../images/logoIconWithoutBackground.png">
    <title>${data.nome}</title>

    <link rel="stylesheet" href="../../styles/estiloUser.css">
    <link rel="stylesheet" href="../../styles/boxes.css">
    <link rel="stylesheet" href="../../styles/styleGenerico.css">

    <script src="../../scripts/avoidFlickering.js"></script>
    <script src="../../scripts/changeTheme.js"></script>
    <script src="../../scripts/userSelectedButton.js"></script>
    <script src="../../scripts/Post.js"></script>
    
</head>
<body>

    <button class="botao" id="btnConfigs" onclick="Editar()"><img src="../../images/settings.png"></button>
    <a class="botao" id="btnVoltar" href="../../app.html">Voltar</a>

   <header id="menuHeader">
        <button class="headerButton" id="headerConfigs" onclick="Editar()" id="menuConfigs"><img src="../../images/settings.png"></button>
        <a class="headerButton" id="headerVoltar" href="../../app.html">Voltar</a>
   </header>

   <div id="pageContent">
        <div id="geral">
            <div id="topper">
                <div id="mainInfo">
                    <div id="boxAvatar">
                        <img src="${data.fotoPerfil}" id="userAvatar">
                    </div>
                    <div id="boxTexto">
                        <div id="boxUserName">
                            <p id="nomeDoUsuario">${data.nome}</p>
                        </div>
                        <div id="boxInfo">
                            <p id="userName">${data.username}</p>
                            <p id="pontos">${data.pontosTotais}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="center">
                <aside id="boxConquistas">
                    <div id="quadradoConquistas">

                    </div>
                </aside>


                <div id="boxCbPosts">
                    <div id="divContentButtons">
                        <button onclick="selecionar("Posts")" id="Posts" class="contentButton">Posts</button>
                        <button onclick="selecionar("CbPessoal")" id="CbPessoal" class="contentButton">Pessoal</button>
                        <button onclick="selecionar("CbConquistas")" id="CbConquistas" class="contentButton">Conquistas</button>
                    </div>

                    <div id="boxPosts" class="boxCbs">
                    </div>

                    <div id="boxCbPessoal" class="boxCbs">
                        <div id="boxCbPessoalRanking">
                        </div>
                        <div id="boxCbPessoalCEDBio">
                            <div id="boxCbBIO">
                                <div id="containerBio"></div>
                            </div>
                            <div id="boxCbCED">
                            </div>
                        </div>
                    </div>

                    <div id="boxCbConquistas" class="boxCbs">
                            <script>document.querySelector("#boxCbConquistas").appendChild(document.querySelector("#quadradoConquistas").cloneNode(true))</script>
                    </div>

                </div>
        
            </div>
        </div>    
        
        <aside id="side">
            <div id="boxBIO">
                <div id="bio">
                    <p id="bioText">${data.descricao}</p>
                </div>
            </div>
        
            <div id="boxCED">
                <div id="conquistaEmDestaque">

                    <div class="cardConquista" id="cardConquistaEmDestaque">
                        
                    </div>

                </div>
            </div>

            <div id="boxRANKING">
                <div id="ranking">
                    
                </div>
            </div>
        </aside>
           
    </div>

    <section id="box" class="confirmarDenuncia">
        <h1>Confirmar denúncia</h1>
        <p>Deseja denunciar o post de <a href="#">Usuário</a>? </p>
        <button onclick="confirmarDenuncia()" id="ConfirmarButton">Confirmar</button>
        <button onclick="fecharDenuncia()"  id="RetornarButton">Retornar</button>
        <button id="exitLogin" onclick="fecharDenuncia()">X</button>
</section>
<p id="tema"></p>
    


</body>
</html>
  


  `
}



