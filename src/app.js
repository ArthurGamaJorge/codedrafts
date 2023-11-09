// Configurando o prisma
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Configurando o express para usar o protocólo http
const express = require('express')
const app = express()

const route = require('./routes/route')

// Nescessários para utilizar da API do google cloud storage
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limita o tamanho da imagem para 5 megas
  },
});
const storage = new Storage({
  projectId: "codedrafts-401521",
  keyFilename: "keys.json"
});
const bucket = storage.bucket('imagesdrafts');

app.post("/upload", multer.single('imgfile'), (req, res) => {
  try {
    if (req.file) {
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Imagem enviada");
        console.log("Enviado");
      });
      blobStream.end(req.file.buffer);
    } else {
      throw "Erro ao enviar mensagem";
    }
  } catch (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      // Lidar com erro de tamanho de arquivo muito grande
      res.status(400).send("Tamanho do arquivo excede o limite permitido");
    } else {
      // Lidar com outros erros
      res.status(400).send(error);
    }
  }
});


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
  const users = await prisma.$queryRaw
  `select * from CodeDrafts.Usuario where email = ${req.body.email} and senha = ${req.body.senha} and ativo = 1`
  res.json(users)
})

app.post("/postsUser", async(req, res) =>{
  const posts = await prisma.$queryRaw
  `select * from CodeDrafts.V_PreviewPost where username = ${req.body.username} order by pontosPost DESC`;
  res.json(posts)
})

app.post("/searchposts", async(req, res) =>{

  query = `select * from CodeDrafts.V_PreviewPost`
  if(req.body.temParametroBusca){
    query += ` WHERE (CHARINDEX('${req.body.content}', titulo, 0) > 0 OR CHARINDEX('${req.body.content}', conteudo, 0) > 0
    OR CHARINDEX('${req.body.content}', nome, 0) > 0)`
  }
  
  if(req.body.tópicos.length != 0){
    if(req.body.temParametroBusca){
      query += ` AND`
    }
    if(!req.body.temParametroBusca && (req.body.tópicos[0] != "Recentes" || req.body.tópicos.length > 1)){
      query += ` WHERE`
    }

    for(var i = 0; i < req.body.tópicos.length-1; i++){
      if(req.body.tópicos[i] != "Recentes"){
      query += ` CHARINDEX('${req.body.tópicos[i]}', tópicos, 0) > 0 AND`
      }
    } 
      if(req.body.tópicos[req.body.tópicos.length-1] != "Recentes"){
        query += ` CHARINDEX('${req.body.tópicos[req.body.tópicos.length-1]}', tópicos, 0) > 0`
      }
  }

  if(req.body.tópicos[0] == "Recentes"){
    query += ` order by idPost DESC`
  } else{
    query += ` order by pontosPost DESC`
  }

  try{
    posts = await prisma.$queryRawUnsafe(query)
  } catch{
    posts = {}
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
  `select * from CodeDrafts.V_Ranking`;

  const existeConquista = await prisma.$queryRaw
  `select * from CodeDrafts.UsuarioConquista where idUsuario = ${ranks[0].idUsuario} and idConquista = 8`;

  if(existeConquista == ""){
    await prisma.$queryRaw
  `insert into CodeDrafts.UsuarioConquista values(${ranks[0].idUsuario}, 8)`;
  }
  res.json(ranks)
})

// CONFIGURATIONS

app.post("/atualizarUsuario", async(req, res) =>{
    const u = await prisma.$queryRaw
      `select * from CodeDrafts.Usuario where email = ${req.body.emailAntigo} and senha = ${req.body.senhaAntiga}`
  try{
    console.log(u[0].idUsuario)
    console.log(`exec CodeDrafts.spAtualizarUsuario ${u[0].idUsuario}, ${req.body.nome}, ${req.body.username}, 
    ${req.body.descricao}, ${req.body.fotoPerfil}, ${req.body.senha}, ${u[0].pontosTotais}, ${u[0].ativo}, ${u[0].quantidadeDenuncias}, ${req.body.email}`)
    
    await prisma.$queryRaw 
        `exec CodeDrafts.spAtualizarUsuario ${u[0].idUsuario}, ${req.body.nome}, ${req.body.username}, 
        ${req.body.descricao}, ${req.body.fotoPerfil}, ${req.body.senha}, ${u[0].pontosTotais}, ${u[0].ativo}, ${u[0].quantidadeDenuncias}, ${req.body.email}`;

        res.json({resposta: "Sucesso"})
        return
  } catch(error){
      if (error.message.includes("UNIQUE em username e e-mail")){
        res.json({resposta: "Unique"})
      }else{
          console.log(error.message)
          res.json({resposta: "Erro"})
      }
  }
  })

app.post("/signup", async(req, res) =>{
  try{
     await prisma.$queryRaw
    `exec CodeDrafts.spInserirUsuario ${req.body.name}, ${req.body.username}, ${req.body.password}, ${req.body.email}`;
    res.json({resposta: "Sucesso"})
  } catch(error){
    if (error.message.includes("UNIQUE em username e e-mail")){
      res.json({resposta: "Unique"})
    } else{
      res.json({resposta: "Erro"})
    }
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
        await prisma.$queryRaw`
          exec CodeDrafts.spAtualizarUsuarioPost ${existeTabela.idUsuarioPost}, ${req.body.idPost}, 1, ${existeTabela.curtido};
          UPDATE CodeDrafts.Post set quantidadeDenuncias += 1 where idPost = ${req.body.idPost};
        `;
      }}
    else{
      res.json({resposta: "False", idPost: req.body.idPost})
    }}
  })

app.post("/jareportouUser", async(req, res) =>{
  const report = await prisma.$queryRaw
  `select * from CodeDrafts.UsuarioUsuario where ((idUsuario1 = ${req.body.idUsuario} and idUsuario2 = ${req.body.idOutroUsuario})
  or (idUsuario1 = ${req.body.idOutroUsuario} and idUsuario2 = ${req.body.idUsuario})) and denunciado = 1`;
  
  if(report != ''){
    res.json({resposta: "True"})
    return
  } 

  else{
    if(req.body.reportar != false){
      res.json({resposta: "False"})
      const existeTabela = await prisma.$queryRaw
      `select * from CodeDrafts.UsuarioUsuario where idUsuario1 = ${req.body.idUsuario} and idUsuario2 = ${req.body.idOutroUsuario}`;

      if(report == ''){
        await prisma.$queryRaw
        `exec CodeDrafts.spInserirUsuarioUsuario ${req.body.idUsuario}, ${req.body.idOutroUsuario}, 0, 1`}
      else{
        await prisma.$queryRaw`
          exec CodeDrafts.spAtualizarUsuarioPost ${existeTabela.idUsuarioUsuario}, ${req.body.idUsuario}, ${req.body.idOutroUsuario}, ${existeTabela.confirmado}, 1;
          UPDATE CodeDrafts.Usuario set quantidadeDenuncias += 1 where idUsuario = ${req.body.idOutroUsuario};
        `;
      }}
    else{
      res.json({resposta: "False"})
    }}
  })


app.post("/curtidas", async(req, res) =>{
  const existeTabela = await prisma.$queryRaw
      `select * from CodeDrafts.UsuarioPost where idUsuario = ${req.body.idUsuario} and idPost = ${req.body.idPost} and curtido is not null`;
  
  criadorPost = await prisma.$queryRaw   
        `select idUsuario from CodeDrafts.Post where idPost = ${req.body.idPost}`;

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
    await prisma.$queryRaw`
      UPDATE CodeDrafts.Post set pontosPost -= ${mudança} where idPost = ${req.body.idPost};
      UPDATE CodeDrafts.Usuario set pontosTotais -= ${mudança} where idUsuario = ${criadorPost[0].idUsuario};
    `;
  
    } 
    if(req.body.ação == "tirarDescurtida"){
      await prisma.$queryRaw`
      exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${req.body.idPost}, ${existeInteração[0].denunciado}, null;
      UPDATE CodeDrafts.Post set pontosPost += 1 where idPost = ${req.body.idPost};
      UPDATE CodeDrafts.Usuario set pontosTotais += 1 where idUsuario = ${criadorPost[0].idUsuario};
    `;
    }

    if(req.body.ação == "curtir"){
      await prisma.$queryRaw
      `exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${req.body.idPost}, ${existeInteração[0].denunciado}, 1`
      
      if(existeInteração[0].curtido == 0){mudança = 2}
      await prisma.$queryRaw`
        UPDATE CodeDrafts.Post set pontosPost += ${mudança} where idPost = ${req.body.idPost};
        UPDATE CodeDrafts.Usuario set pontosTotais += ${mudança} where idUsuario = ${criadorPost[0].idUsuario};
      `;

    } 
    if(req.body.ação == "tirarCurtida"){
      await prisma.$queryRaw`
        exec CodeDrafts.spAtualizarUsuarioPost ${existeInteração[0].idUsuarioPost}, ${req.body.idPost}, ${existeInteração[0].denunciado}, null;
        UPDATE CodeDrafts.Post set pontosPost -= 1 where idPost = ${req.body.idPost};
        UPDATE CodeDrafts.Usuario set pontosTotais -= 1 where idUsuario = ${criadorPost[0].idUsuario};
      `;
}
} else{
    opção = -1
    mudança = null
    if(req.body.ação == "descurtir"){
      opção = 0
    } 
    if(req.body.ação == "tirarDescurtida" || req.body.ação == "tirarCurtida"){
      opção = null
    }
    if(req.body.ação == "curtir"){
      opção = 1
    } 
    await prisma.$queryRaw
    `exec CodeDrafts.spInserirUsuarioPost ${req.body.idUsuario}, ${req.body.idPost}, 0, ${opção}`

    if(opção == 1){
      await prisma.$queryRaw
        `UPDATE CodeDrafts.Usuario set pontosTotais += 1 where idUsuario = ${criadorPost[0].idUsuario}`;
    }
    if(opção == 0){
      await prisma.$queryRaw
        `UPDATE CodeDrafts.Usuario set pontosTotais -= 1 where idUsuario = ${criadorPost[0].idUsuario}`;
    }
  
}

  res.json({resposta: ""})})



app.get('/user/*', async (req, res) => {
  const urlString = req.url;
  const urlAsString = urlString.toString();
  const usernameV = urlAsString.split("/");
  const username = usernameV[2];;


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
    const userSearch = await prisma.$queryRaw `select * from CodeDrafts.Usuario where idUsuario=${result.idUsuario}`;
    user = userSearch[0]
    res.send(`
      <h1>${result.titulo}</h1>
      <h2>${user.nome}</h2>
      <img style="width:300px;height:300px;border:3px solid black" src="${result.capa}">
      <h1>${result.pontosPost}</h1>
      <p>${result.conteudo}</p>
    `)
  } else {
    res.send(`
      <br><br>
      <h1 style="font-size:70px;text-align:center">Post não encontrado.</h1>
      `);
  }
});



app.post("/postar", async(req, res) =>{

  await prisma.$queryRaw
  `exec Codedrafts.spInserirPost ${req.body.titulo},${req.body.conteudo},0,${req.body.capa},1,0,${req.body.idUsuario},null`

  const idPostSearch = await prisma.$queryRaw
  `select idPost from codedrafts.post order by idPost desc`

  idPost = parseInt(idPostSearch[0].idPost)

  for(i=0;i<req.body.topicos.length;i++){
    await prisma.$queryRaw
    `insert into codedrafts.PostTopico values (${idPost},${req.body.topicos[i]});`
  }

  //depois de capa é aprovado

})

app.post("/deletarPost", async(req, res) =>{
  await prisma.$queryRaw
  `exec CodeDrafts.spDeletarPost ${req.body.idPost},${req.body.idModerador}`

  res.json({resposta: "Sucesso"})
})

app.post("/excluirUsuario", async(req, res) =>{
  await prisma.$queryRaw
  `exec CodeDrafts.spDeletarUsuario ${req.body.idUsuario}`

  res.json({resposta: "Sucesso"})
})

app.post("/desativarUsuario", async(req, res) =>{
  console.log(req.body.idUsuario)
  await prisma.$queryRaw
  `update CodeDrafts.Usuario set ativo = 0 where idUsuario = ${req.body.idUsuario}`

  res.json({resposta: "Sucesso"})
})



function createUserPage(data){
return `<!DOCTYPE html>
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
  </head>
  <body id="${data.idUsuario}">
  
      <button class="botao" id="btnConfigs" onclick="reportarUser()"><img src="../../images/report.png"></button>
      <a class="botao" id="btnVoltar" href="../../app.html">Voltar</a>
  
     <header id="menuHeader">
          <button class="headerButton" id="headerConfigs" onclick="reportarUser()" id="menuConfigs"><img src="../../images/report.png"></button>
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
                          <button onclick="selecionar('Posts')" id="Posts" class="contentButton">Posts</button>
                          <button onclick="selecionar('CbPessoal')" id="CbPessoal" class="contentButton">Pessoal</button>
                          <button onclick="selecionar('CbConquistas')" id="CbConquistas" class="contentButton">Conquistas</button>
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
      <p>Deseja denunciar o post desse usuário? </p>
      <button onclick="confirmarDenuncia()" id="ConfirmarButton">Confirmar</button>
      <button onclick="fecharDenuncia()"  id="RetornarButton">Retornar</button>
      <button id="exitLogin" onclick="fecharDenuncia()">X</button>
  </section>
  
  <section id="box" class="confirmarDenuncia DenunciaUser">
      <h1>Confirmar denúncia</h1>
      <p>Deseja denunciar esse usuário? </p>
      <button onclick="confirmarDenunciaUsuario()" id="ConfirmarButton">Confirmar</button>
      <button onclick="fecharDenuncia()"  id="RetornarButton">Retornar</button>
      <button id="exitLogin" onclick="fecharDenuncia()">X</button>
  </section>

  <section id="box" class="confirmarDenuncia confirmarDeletarPost">
    <h1>Confirmar Deleção</h1>
    <p>Deseja realmente apagar seu post? </p>
    <button onclick="confirmarDeleçãoPost()" id="ConfirmarButton">Confirmar</button>
    <button onclick="fecharDeleção()"  id="RetornarButton">Retornar</button>
    <button id="exitLogin" onclick="fecharDeleção()">X</button>
</section>
  
  <p id="idUsuario">${data.idUsuario}</p>
  <img id="tema" src="../../images/DarkIcon.png" style="display: none">
      
      <script src="../../scripts/changeTheme.js"></script>
      <script src="../../scripts/userSelectedButton.js"></script>
      <script src="../../scripts/scriptUser.js"></script>
      <script src="../../scripts/Post.js"></script>
  
  </body>
  </html>`
}



